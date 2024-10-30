import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { invalidCredentialsError, pendingActivationError } from '../../services/errorService.js';
import { pendingActivationError } from '../../services/errorService.js';
import selectUserByEmailService from "../../services/users/selectUserByEmailService.js";
import { invalidCredentialsError } from '../../services/errorService.js';

const loginUserController = async (req, res, next) => {
    try {
        
        const {email, password} = req.body;

        if(!email || !password) invalidCredentialsError()

        const user = await selectUserByEmailService(email);

        let validPassword;

        if(user){
            validPassword = await bcrypt.compare(password, user.password);
        }

        if(!user || !validPassword){
            invalidCredentialsError();
        }

        /*
            comprobar que el active esté en 1
        */
        if(!user.active) pendingActivationError();
        
        /**
         * generar el token
         */
        const tokenInfo = {
            id: user.id,
            role: user.role
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '3d'
        });

        res.send({
            status: 'ok',
            token:{
                token
            }
        });
        
    } catch (error) {
        next(error);
    }
}


export default loginUserController;
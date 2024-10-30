import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import selectUserByEmailService from "../../services/users/selectUserByEmailService.js";

const loginUserController = async (req, res, next) => {
    try {
        
        const {email, password} = req.body;

        if(!email || !password) throw generateErrorsUtils('Se esperaba email o contraseña', 400);

        const user = await selectUserByEmailService(email);

        let validPassword;

        if(user){
            validPassword = await bcrypt.compare(password, user.password);
        }

        if(!user || !validPassword){
            throw generateErrorsUtils('Usuario o contraseña incorrecta', 401);
        }

        /*
            comprobar que el active esté en 1
        */
        if(!user.active) throw generateErrorsUtils('Usuario pendiente de activación',403);
        
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
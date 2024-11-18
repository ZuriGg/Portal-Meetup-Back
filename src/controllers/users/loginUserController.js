import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {
    invalidCredentialsError,
    pendingActivationError,
} from '../../services/errorService.js';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

//siempre que se use joi, necesario validateSchemaUtil
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//esquema concreto
import loginUserSchema from '../../schemas/users/loginUserSchema.js';

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validamos el body con Joi antes de seguir con la lógica del controlador
        await validateSchemaUtil(loginUserSchema, req.body);

        const user = await selectUserByEmailModel(email, password);

        let validPass;

        validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            throw invalidCredentialsError();
        }

        if (!user) {
            throw invalidCredentialsError();
        }

        //comprobar que el usuario se active en 1
        if (user.active !== 1) {
            return pendingActivationError();
        }

        //generamos el token
        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            tokenInfo: tokenInfo,
            token: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default loginUserController;

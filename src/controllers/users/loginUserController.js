import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {
    invalidCredentialsError,
    pendingActivationError,
} from '../../services/errorService.js';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import loginUserSchema from '../../schemas/users/loginUserSchema.js';

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(loginUserSchema, req.body);

        //buscamos usuario por email
        const user = await selectUserByEmailModel(email);

        if (!user) {
            invalidCredentialsError();
        }

        //comprobar que el active esté en 1
        if (!user.active) pendingActivationError();

        // Compara la contraseña ingresada con el hash almacenado.
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return invalidCredentialsError();
        }

        /**
         * generar el token
         */
        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            token: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default loginUserController;

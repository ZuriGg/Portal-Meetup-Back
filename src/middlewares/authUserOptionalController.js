/* PARA ACCESO DE INVITADOS */
import jwt from 'jsonwebtoken';

import { invalidCredentialsError } from '../services/errorService.js';

// Función controladora intermedia que desencripta el token y crea la propiedad "req.user".
// Si no hay token NO lanza un error.
const authUserControllerOptional = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (authorization) {
            // Variable que almacenará la info del token.
            let tokenInfo;

            try {
                tokenInfo = jwt.verify(authorization, process.env.SECRET);
            } catch (err) {
                console.log(err);
                invalidCredentialsError();
            }

            // Si hemos llegado hasta aquí quiere decir que el token ya se ha desencriptado.
            // Creamos la propiedad "user" en el objeto "request"
            req.user = tokenInfo;
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default authUserControllerOptional;

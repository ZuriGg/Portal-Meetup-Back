/* RUTA SÓLO PARA USUARIOS AUTENTICADOS */
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {
    invalidCredentialsError,
    notAuthenticatedError,
} from '../services/errorService.js';

// Controlador de ruta para el TOKEN
const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers; // El Header contiene el token JWT.
        if (!authorization) {
            //si no hay autorización en el header, se lanza un error
            throw notAuthenticatedError();
        }

        let tokenInfo; //para guardar la verificación del token

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET); //'authorization' es el token y 'process.env.SECRET' es la clave secreta
        } catch (error) {
            throw invalidCredentialsError();
        }

        req.user = tokenInfo; //Se asigna la información decodificada del token (almacenada en tokenInfo) al objeto req.user.
        console.log('Información del token:', tokenInfo);
        next();
    } catch (error) {
        next(error);
    }
};

export default authUser;

//El middleware se encarga de verificar que el usuario esté autenticado mediante token JWT, mediante el header de la solicitud --> usa una clave secreta, y, si es válido, almacena la información del usuario en req.user.
//se genera el JWT en el loguin

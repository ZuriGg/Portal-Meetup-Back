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
        const { authorization } = req.headers; //coge el token del header
        if (!authorization) {
            notAuthenticatedError(res); //401 --> error de autorización
        }

        let tokenInfo; //serán los datos del usuario

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET); //decodifica el token con la clave secreta
        } catch (error) {
            invalidCredentialsError(res);
        }

        req.user = tokenInfo; //guarda la info decodificada en req.user
        console.log('User decoded from token:', req.user);
        next();
    } catch (error) {
        next(error);
    }
};

export default authUser;

//El middleware se encarga de verificar que el usuario esté autenticado mediante token JWT, mediante el header de la solicitud --> usa una clave secreta, y, si es válido, almacena la información del usuario en req.user.
//se genera el JWT en el loguin

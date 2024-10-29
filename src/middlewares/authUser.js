import jwt from 'jsonwebtoken';
import  from '../utils/generateErrorsUtils.js'; /* falta este archivo por si alguna operacion da error en este middleware */
import 'dotenv/config';

// Controlador de ruta para el TOKEN
const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers; // El Header contiene el token JWT.
        if (!authorization) {
            //si no hay autorización en el header, se lanza un error
            throw generateErrorsUtils('Se esperaba un token en el header', 401); //401 --> error de autorización
        }

        let tokenInfo; //para guardar la verificación del token --> tokenInfo serán los datos del usuario

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET); //'authorization' es el token y 'process.env.SECRET' es la clave secreta
        } catch (error) {
            throw errorService('Credenciales inválidas', 401);
        }

        req.user = tokenInfo; //Se asigna la información decodificada del token (almacenada en tokenInfo) al objeto req.user. Esto q permite que los siguientes controladores en la cadena puedan acceder a los datos del usuario autenticado.
        next();
    } catch (error) {
        next(error);
    }
};

export default authUser;

//El middleware se encarga de verificar que el usuario esté autenticado mediante token JWT, mediante el header de la solicitud --> usa una clave secreta, y, si es válido, almacena la información del usuario en req.user.
//se genera el JWT en el loguin

//Error genérico de autorización denegada
import { unauthorizedUserError } from '../services/errorService.js';

//Función que controla si un usuario es administrador
const canValidate = async (req, res, next) => {
    try {
        //Comprobación para saber si el usuario es administrador, si no, lanzamos error
        console.log(`El usuario es ${req.user.role}`);

        if (req.user.role !== 'admin') {
            unauthorizedUserError();
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default canValidate;

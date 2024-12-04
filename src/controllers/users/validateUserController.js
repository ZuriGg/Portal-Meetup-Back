import updateUserRegCodeModel from '../../models/users/updateUserRegCodeModel.js';
import { URL_FRONT_VERDADERA } from '../../../env.js';

//valida a un usuario recién registrado:
const validateUserController = async (req, res, next) => {
    try {
        // Obtenemos el código de registro de los path params.
        const { registrationCode } = req.params;

        if (!registrationCode || typeof registrationCode !== 'string') {
            return res.status(400).send({
                status: 'error',
                message: 'Código de registro no válido',
            });
        }

        // Activamos el usuario.
        await updateUserRegCodeModel(registrationCode);

        //reddericcionamos la respuesta
        res.redirect(`${URL_FRONT_VERDADERA}/user/validate`);
    } catch (err) {
        res.send({
            status: 'error',
            message: 'Usuario no activado',
        });
        next(err);
    }
};

export default validateUserController;

//A LA ESPERA CONFIRMACIÓN DE SI ES NECESARIO VALIDAR LOS PARAMS

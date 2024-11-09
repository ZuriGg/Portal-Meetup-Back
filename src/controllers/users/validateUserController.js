import updateUserRegCodeModel from '../../models/users/updateUserRegCodeModel.js';

//valida a un usuario recién registrado:
const validateUserController = async (req, res, next) => {
    try {
        // Obtenemos el código de registro de los path params.
        const { registrationCode } = req.params;

        // Activamos el usuario.
        await updateUserRegCodeModel(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (err) {
        next(err);
    }
};

export default validateUserController;

//A LA ESPERA CONFIRMACIÓN DE SI ES NECESARIO VALIDAR LOS PARAMS

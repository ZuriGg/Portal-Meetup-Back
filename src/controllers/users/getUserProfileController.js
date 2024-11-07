import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import { notFoundError } from '../../services/errorService.js';

const getUserProfileController = async (req, res, next) => {
    try {
        // id del usuario extraido de path params.
        const { userId } = req.params;

        // datos del usuario.
        const user = await selectUserByIdModel(userId);

        // Eliminamos los datos privados del usuario.
        delete user.password;  // No enviar la contraseña.
        delete user.email;     // No enviar el correo electrónico.
        delete user.registrationCode; // No enviar el código de registro.
        delete user.recoverPassCode;  // No enviar el código de recuperación de contraseña.

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getUserProfileController;

// El propósito de esta función es manejar una solicitud para obtener el perfil de un usuario por su userId, asegurándose de eliminar información privada (como el correo electrónico) antes de enviar la respuesta.
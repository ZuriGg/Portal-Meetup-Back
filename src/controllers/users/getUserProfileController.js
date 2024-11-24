import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

//AGREGAR VALIDACIÓN JOI

//necesario validateSchemaUtil para trabajar con joi
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el esquema concreto

const getUserProfileController = async (req, res, next) => {
    try {
        // id del usuario extraido de path params.
        const { userId } = req.params;

        // datos del usuario.
        const user = await selectUserByIdModel(userId);

        // Eliminamos los datos privados del usuario.
        delete user.password;
        delete user.registrationCode;
        delete user.recoverPassCode;

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

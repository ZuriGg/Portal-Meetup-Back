import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import editUserModel from '../../models/users/editUserModel.js';
import { notFoundError } from '../../services/errorService.js';

//importar siempre validateSchemaUtil para poder usar Joi
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el esquema concreto
import editUserSchema from '../../schemas/users/editUserSchema.js';

const editUserController = async (req, res, next) => {
    try {
        const { userId } = req.params; //HAY QUE CAMBIAR ESTO!!! NO SE PUEDE PASAR POR PARAMS EL ID DEL USUARIO

        const { firstName, lastname, email, username, password } = req.body;

        // Validamos el body con Joi antes de seguir con la lógica del controlador
        await validateSchemaUtil(editUserSchema, req.body);

        const { id } = await selectUserByIdModel(userId);

        if (userId != id) throw notFoundError('userId');

        await editUserModel(
            firstName,
            lastname,
            username,
            email,
            password,
            userId
        );

        res.send({
            message: 'Ok, usuario editado',
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;

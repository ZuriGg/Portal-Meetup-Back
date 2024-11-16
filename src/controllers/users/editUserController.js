import selectUserByIdModel from '../../models/users/selectUserByIdModel.js'; //no
import editUserModel from '../../models/users/editUserModel.js';
import { notFoundError } from '../../services/errorService.js';

//importar siempre validateSchemaUtil para poder usar Joi
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema, que será el mismo que el del usuario normal
import editUserSchema from '../../schemas/users/editUserSchema.js';

const editUserController = async (req, res, next) => {
    try {
        // Verifica si req.user existe y tiene un id
        if (!req.user || !req.user.id) {
            return notFoundError('ID de usuario');
        }
        const { id: userId } = req.user; //recogemos el id de forma segura

        const { firstName, lastname, email, username } = req.body;

        // Validamos el body con Joi antes de seguir con la lógica del controlador
        await validateSchemaUtil(editUserSchema, req.body);

        // comprobamos si el usuario existe
        const user = await selectUserByIdModel(userId);
        if (!user) throw notFoundError('Usuario');

        await editUserModel(firstName, lastname, username, email, userId);

        res.send({
            message: 'Ok, usuario editado',
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;

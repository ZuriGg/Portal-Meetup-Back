import selectUserByIdModel from '../../models/users/selectUserByIdModel.js'; //no
import editUserModel from '../../models/users/editUserModel.js';
import { notFoundError } from '../../services/errorService.js';

//importar siempre validateSchemaUtil para poder usar Joi
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema, que será el mismo que el del usuario normal
import newUserSchema from '../../schemas/users/newUserSchema.js';

const editUserController = async (req, res, next) => {
    try {
        const userId = req.user.id; //recogemos el id de forma segura

        const { firstName, lastname, email, username } = req.body;

        // Validamos el body con Joi antes de seguir con la lógica del controlador
        await validateSchemaUtil(newUserSchema, req.body);

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

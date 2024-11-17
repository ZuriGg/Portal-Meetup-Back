import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import editUserModel from '../../models/users/editUserModel.js';
import { notFoundError } from '../../services/errorService.js';

//importar siempre validateSchemaUtil para poder usar Joi
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema concreto
import editUserSchema from '../../schemas/users/editUserSchema.js';

const editUserController = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        console.log('userId desde req.user:', userId);

        const { firstName, lastname, email, username } = req.body;

        // Validamos el body con Joi antes de seguir con la lógica del controlador
        await validateSchemaUtil(editUserSchema, req.body);

        //verificamos que el usuario existe
        const { id } = await selectUserByIdModel(userId);
        console.log('id desde la base de datos:', id);

        if (userId !== id) throw notFoundError('userId');

        //actualizamos el usuario
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

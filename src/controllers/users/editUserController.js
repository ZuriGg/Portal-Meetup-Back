import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import editUserModel from '../../models/users/editUserModel.js';
import { notFoundError } from '../../services/errorService.js';

//importar siempre validateSchemaUtil para poder usar Joi
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema concreto
import editUserSchema from '../../schemas/users/editUserSchema.js';

const editUserController = async (req, res, next) => {
    console.log('req.user:', req.user);

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

        // Obtener los datos actualizados desde la base de datos //AÑADIENDO RESPUESTA PARA QUE LA TOME EL FRONT
        const updatedUser = await selectUserByIdModel(userId);
        console.log('Datos actualizados desde la base de datos:', updatedUser);

        res.send({
            message: 'Ok, usuario editado',
            status: 200,
            data: updatedUser, // Datos actualizados
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;

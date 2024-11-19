import updateUserPassModel from '../../models/users/updateUserPassModel.js';

//necesario validateSchemaUtil para trabajar con joi
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el esquema concreto
import editUserPassSchema from '../../schemas/users/editUserPassSchema.js';

const editUserPassController = async (req, res, next) => {
    try {
        const { email, recoverPassCode, newPass } = req.body;

        // Validamos el body con Joi antes de seguir con la lógica del controlador
        await validateSchemaUtil(editUserPassSchema, req.body);

        await updateUserPassModel(email, recoverPassCode, newPass);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};

export default editUserPassController;

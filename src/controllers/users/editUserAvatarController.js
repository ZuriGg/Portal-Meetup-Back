import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import updateUserAvatarModel from '../../models/users/updateUserAvatarModel.js';

import {
    savePhotoService,
    deletePhotoService,
} from '../../services/photoService.js';

//importar siempre validateSchemaUtil para poder usar Joi
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el esquema concreto
import editUserAvatarSchema from '../../schemas/users/editUserAvatarSchema.js';

const editUserAvatarController = async (req, res, next) => {
    try {
        console.log(req.files.avatar);

        const { avatar } = req.files;

        // Validamos el body con Joi. Si "files" no existe enviamos un objeto vacío.
        await validateSchemaUtil(editUserAvatarSchema, req.files || {});

        // Obtenemos los datos del usuario para comprobar si ya tiene un avatar previo.
        const user = await selectUserByIdModel(req.user.id);

        // Si el usuario tiene un avatar previo lo eliminamos.
        if (user.avatar) {
            await deletePhotoService(user.avatar);
        }

        // Guardamos el avatar en la carpeta de subida de archivos. Redimensionamos a un ancho
        // de 100 píxeles.
        const avatarName = await savePhotoService(avatar, 500);

        // Actualizamos los datos del usuario con el nombre de avatar que hemos obtenido.
        await updateUserAvatarModel(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'avatar de usuario actualizado',
        });
    } catch (err) {
        next(err);
    }
};

export default editUserAvatarController;

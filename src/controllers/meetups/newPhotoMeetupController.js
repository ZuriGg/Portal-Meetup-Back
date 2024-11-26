import {
    savePhotoService,
    deletePhotoService,
} from '../../services/savePhotoService.js';

import selectMeetupPhotosByIdModel from '../../models/meetups/selectMeetupPhotosByIdModel.js';

//importar siempre validateSchemaUtil para poder usar Joi
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el esquema concreto
import editMeetupImgSchema from '../../schemas/meetups/editMeetupImgSchema.js';
import updateMeetupPhotoModel from '../../models/meetups/updateMeetupPhotoModel.js';

const newPhotoMeetupController = async (req, res, next) => {
    try {
        console.log(req.files.image);

        const { image } = req.files;
        const { meetupId, photoId } = req.params;

        // Validamos el body con Joi. Si "files" no existe enviamos un objeto vacío.
        await validateSchemaUtil(editMeetupImgSchema, req.files || {});

        // Obtenemos los datos del meetup para comprobar si ya tiene una imagen previa.
        const meetupPhoto = await selectMeetupPhotosByIdModel(
            meetupId,
            photoId
        );

        // Si el usuario tiene un avatar previo lo eliminamos.
        if (meetupPhoto.name) {
            await deletePhotoService(meetupPhoto.name);
        }

        // Guardamos el avatar en la carpeta de subida de archivos. Redimensionamos a un ancho de 500 píxeles.
        const meetupPhotoName = await savePhotoService(image, 1000);

        // Actualizamos los datos del usuario con el nombre de avatar que hemos obtenido.
        await updateMeetupPhotoModel(meetupPhotoName, meetupId, photoId);

        res.send({
            status: 'ok',
            message: `Imagen ${photoId} actualizada en meetup ${meetupId}`,
        });
    } catch (err) {
        next(err);
    }
};

export default newPhotoMeetupController;

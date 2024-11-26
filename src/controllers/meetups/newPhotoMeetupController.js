import {
    savePhotoService,
    deletePhotoService,
} from '../../services/savePhotoService.js';

import selectMeetupPhotosByIdModel from '../../models/meetups/selectMeetupPhotosByIdModel.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import editMeetupImgSchema from '../../schemas/meetups/editMeetupImgSchema.js';
import updateMeetupPhotoModel from '../../models/meetups/updateMeetupPhotoModel.js';

const newPhotoMeetupController = async (req, res, next) => {
    try {
        // Obtenemos las imágenes del formulario
        const { image1, image2, image3 } = req.files; // Asegúrate de que las imágenes estén correctamente nombradas en el formulario
        const { meetupId } = req.params;

        // Validamos el body con Joi (si los archivos existen, validamos)
        await validateSchemaUtil(editMeetupImgSchema, req.files || {});

        // Creamos un array de imágenes, donde cada índice corresponde a una imagen
        const images = [image1, image2, image3];

        // Recorremos cada una de las imágenes
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            if (!image) continue; // Si no hay imagen para este índice, la saltamos

            const photoId = i + 1; // La fotoId será 1, 2 o 3 (basado en el índice)

            // Verificamos si ya existe una foto para ese meetupId y photoId
            let meetupPhoto;
            try {
                meetupPhoto = await selectMeetupPhotosByIdModel(
                    meetupId,
                    photoId
                );
            } catch (err) {
                // Si no existe, devolvemos null y creamos una nueva entrada
                meetupPhoto = null;
            }

            // Si ya existe una foto, la eliminamos antes de insertar la nueva
            if (meetupPhoto && meetupPhoto.name) {
                await deletePhotoService(meetupPhoto.name); // Eliminamos la foto previa
            }

            // Guardamos la nueva imagen en el servidor (se puede redimensionar si es necesario)
            const meetupPhotoName = await savePhotoService(image, 1000);

            // Insertamos o actualizamos la foto en la base de datos
            await updateMeetupPhotoModel(meetupPhotoName, meetupId, photoId);
        }

        res.send({
            status: 'ok',
            message: `Fotos actualizadas o creadas en meetup ${meetupId}`,
        });
    } catch (err) {
        next(err); // Si ocurre un error, lo pasamos al middleware de manejo de errores
    }
};

export default newPhotoMeetupController;

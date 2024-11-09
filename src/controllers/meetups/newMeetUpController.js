import insertMeetupModel from '../../models/meetups/insertMeetupModel.js';

//para validar el body con el esquema proporcionado
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema concreto
import newMeetupSchema from '../../schemas/meetups/newMeetupSchema.js';

const newMeetupController = async (req, res, next) => {
    try {
        const {
            title,
            description,
            startDate,
            oneSession,
            locationId,
            categoryId,
            city,
            address,
            notes,
            zip,
            hourMeetUp,
            dayOfTheWeek,
            aforoMax,
            userId,
        } = req.body;

        // aplicamos la validacion con joi antes de seguir con el controlador
        await validateSchemaUtil(newMeetupSchema, req.body);

        await insertMeetupModel(
            title,
            description,
            startDate,
            oneSession,
            locationId,
            categoryId,
            city,
            address,
            notes,
            zip,
            hourMeetUp,
            dayOfTheWeek,
            aforoMax,
            userId
            /* meetUpPhotos, */
            /*             req.user.id */
        );

        /*         let photos = []; */

        /*         if (req.files) {
            for (let photo of Object.values(req.files).slice(0, 3)) {
                let photoName = await savePhotoUtils(photo, 600);

                //NO SE HA CREADO SERVICIO insertPhotoEntrieService
                                 const photoId = await insertPhotoEntrieService(
                    photoName,
                    entryId
                ); 

                                 photos.push({
                    id: photoId,
                    name: photoName,
                }); 
            }
        } */

        res.send({
            status: 'ok',
            data: {
                entry: {
                    title,
                    description,
                    startDate,
                    oneSession,
                    categoryId,
                    address,
                    notes,
                    zip,
                    hourMeetUp,
                    dayOfTheWeek,
                    aforoMax,
                    userId,

                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default newMeetupController;

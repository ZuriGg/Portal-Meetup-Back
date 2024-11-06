import insertMeetupModel from '../../models/meetups/insertMeetupModel.js';

const newMeetupController = async (req, res, next) => {
    try {
        const {
            title,
            description,
            startDate,
            oneSession,
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

        await insertMeetupModel(
            title,
            description,
            startDate,
            oneSession,
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

import insertMeetUpEntryService from '../../services/meetups/insertMeetUpEntryService.js';

const newMeetUpEntryController = async (req, res, next) => {
    try {
        const {
            title,
            description,
            startDate,
            category,
            idLocation,
            city,
            address,
            notes,
            zip,
            hourMeetUp,
            aforoMax,
        } = req.body;

        const entryId = await insertMeetUpEntryService(
            title,
            description,
            startDate,
            category,
            idLocation,
            city,
            address,
            notes,
            zip,
            hourMeetUp,
            aforoMax,
            meetUpPhotos,
            req.user.id
        );

        let photos = [];

        if (req.files) {
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
        }

        res.send({
            status: 'ok',
            data: {
                entry: {
                    id: entryId,
                    title,
                    description,
                    startDate,
                    category,
                    idLocation,
                    hourMeetUp,
                    aforoMax,
                    userId: req.user.id,
                    meetUpPhotos,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default newMeetUpEntryController;

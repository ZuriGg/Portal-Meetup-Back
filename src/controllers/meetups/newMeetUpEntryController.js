import insertMeetUpEntryService from '../../services/meetups/insertMeetUpEntryService.js';

const newMeetUpEntryController = async (req, res, next) => {
    try {
        const {
            title,
            description,
            startDate,
            category,
            idLocation,
            hourMeetUp,
            aforoMax,
        } = req.body;

        const entryId = await insertMeetUpEntryService(
            title,
            description,
            startDate,
            category,
            idLocation,
            hourMeetUp,
            aforoMax,
            meetUpPhotos
        );

        let photos = [];

        if (req.files) {
            for (let photo of Object.values(req.files).slice(0, 1)) {
                let photoName = await savePhotoUtils(photo, 600);

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
                    id: title,
                    description,
                    startDate,
                    category,
                    idLocation,
                    hourMeetUp,
                    aforoMax,
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

const newMeetUpEntryController = async (req, res, next) => {
    try {
        const {
            title,
            place,
            description,
            startDate,
            category,
            idLocation,
            hourMeetUp,
            aforoMax,
        } = req.body;

        const entryId = await insertMeetUpEntryService(
            title,
            place,
            description,
            startDate,
            category,
            idLocation,
            hourMeetUp,
            aforoMax,
            meetUpPhotos
        );

        let photos = [];

        res.send({
            status: 'ok',
            data: {
                entry: {
                    id: title,
                    place,
                    description,
                    startDate,
                    category,
                    idLocation,
                    hourMeetUp,
                    aforoMax,
                    meetUpPhotos,
                },
            },
        });
    } catch (error) {}
};

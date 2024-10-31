import editMeetupModel from '../../models/meetups/editMeetupModel.js';

const editMeetupController = async (req, res, next) => {
    try {
        const { entryId } = req.params;

        const { title, place, description } = req.body;

        await editMeetupModel(
            title,
            description,
            startDate,
            oneSession,
            hourMeetup,
            dayOfTheWeek,
            aforoMax,
            locationId,
            categoryId,
            modifiedAt,
            entryId
        );

        res.send({
            status: 'ok',
            message: 'Entrada actualizada',
        });
    } catch (error) {
        next(error);
    }
};

export default editMeetupController;

import editMeetupModel from '../../models/meetups/editMeetupModel.js';

const editMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;

        const {
            title,
            description,
            startDate,
            oneSession,
            categoryId,
            locationId,
            city,
            address,
            notes,
            zip,
            userId,
            owner,
            hourMeetUp,
            dayOfTheWeek,
            aforoMax,
        } = req.body;

        await editMeetupModel(
            title,
            description,
            startDate,
            oneSession,
            categoryId,
            locationId,
            city,
            address,
            notes,
            zip,
            userId,
            owner,
            hourMeetUp,
            dayOfTheWeek,
            aforoMax,
            meetupId
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

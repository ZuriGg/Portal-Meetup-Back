import invalidDayMeetupModel from '../../models/meetups/invalidDayMeetupModel.js';

const invalidDayMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;
        const { date } = req.body;

        if (!date) {
            throw new Error(
                'La fecha es obligatoria para inhabilitar el día del meetup.'
            );
        }

        const resultId = await invalidDayMeetupModel(meetupId, date);

        res.send({
            status: 'ok',
            message: 'Día del meetup inhabilitado correctamente',
            data: {
                meetupId,
                date,
                recordId: resultId,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default invalidDayMeetupController;

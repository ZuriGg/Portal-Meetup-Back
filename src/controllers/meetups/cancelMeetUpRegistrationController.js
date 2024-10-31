import cancelMeetUpRegistrationModel from '../../models/meetups/cancelMeetUpRegistrationModel.js';

const cancelMeetUpRegistrationContoller = async (req, res, next) => {
    try {
        const { meetupId } = req.params;
        const { userId } = req.user.id;

        await cancelMeetUpRegistrationModel(userId, meetupId);

        res.send({
            status: 'ok',
            message: ' La inscripcion al meetup ha sido cancelada',
        });
    } catch (error) {
        next(error);
    }
};

export default cancelMeetUpRegistrationContoller;

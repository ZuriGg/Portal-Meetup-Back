import deleteMeetupModel from '../../models/meetups/deleteMeetupModel.js';

const deleteMeetupController = async (req, res, next) => {
    try {
        const { MeetupId } = req.params;

        await deleteMeetupModel(MeetupId);

        res.send({
            status: 'ok',
            message: `El meetup con id ${MeetupId} y todos sus elementos fueron eliminados`,
        });
    } catch (error) {
        next(error);
    }
};

export default deleteMeetupController;

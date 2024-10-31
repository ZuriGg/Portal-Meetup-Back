import insertVoteModel from '../../models/meetups/insertVoteModel.js';

const voteMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;
        const { userId } = req.user.id;
        const { date } = req.user.id;

        await insertVoteModel(userId, meetupId, date);

        res.send({
            status: 'ok',
            message: 'Se ha inscrito correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default voteMeetupController;

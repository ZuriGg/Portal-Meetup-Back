import voteMeetupService from '../../services/meetups/voteMeetupService.js';

const voteMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;
        const { userId } = req.user.id;
        const { date } = req.user.id;

        await voteMeetupService(userId, meetupId, date);

        res.send({
            status: 'ok',
            message: 'Se ha inscrito correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default voteMeetupController;

import insertInscriptionModel from '../../models/meetups/insertInscriptionModel.js';

const inscriptionDateMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;
        const { user } = req.headers;
        const { date } = req.body;

        await insertInscriptionModel(user, meetupId, date);

        res.send({
            status: 'ok',
            message: 'Se ha inscrito correctamente',
        });
    } catch (error) {
        if (error.message === 'duplicate_attendance') {
            // Si el error es por inscripción duplicada
            res.status(400).send({
                status: 'error',
                message: 'Ya estás inscrito para este meetup en esta fecha.',
            });
        } else {
            next(error);
        }
    }
};

export default inscriptionDateMeetupController;

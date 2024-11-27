import insertInscriptionModel from '../../models/meetups/insertInscriptionModel.js';

const inscriptionDateMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;
        const { user } = req.headers;
        const { date } = req.body;

        console.log(`La id del meetup es: ${meetupId}`);
        console.log(`La id del usuario es: ${user}`);
        console.log(`La mierda de date es: ${date}`);

        await insertInscriptionModel(user, meetupId, date);

        res.send({
            status: 'ok',
            message: 'Se ha inscrito correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default inscriptionDateMeetupController;

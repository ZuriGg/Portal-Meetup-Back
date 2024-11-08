import insertInscriptionModel from '../../models/meetups/insertInscriptionModel.js';

const inscriptionMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;
        const { date, user } = req.headers;

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

export default inscriptionMeetupController;

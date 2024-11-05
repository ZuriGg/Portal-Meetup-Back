import insertVoteModel from '../../models/meetups/insertVoteModel.js';
import getMeetupController from './getMeetupController.js';

const newVoteController = async (req, res, next) => {
    try {
        const { attendanceId } = req.params; //id de la sesión del meetup
        const { userId } = req.user; // id del usuario autenticado
        const { value, coment } = req.body; //puntuación y comentario

        //asegurar que la fecha del meetup haya pasado
        const meetup = await getMeetupController(attendanceId); // Asegúrate de tener esta función
        if (new Date() < new Date(meetup.date)) {
            return res
                .status(403)
                .json({ message: 'No se puede votar antes del evento.' });
        }

        //aseguramos que el valor sea 1-5
        if (value < 1 || value > 5) {
            return res
                .status(400)
                .json({ message: 'La calificación debe estar entre 1 y 5.' });
        }

        //llamamos a newVoteModel para interactuar con la BBDD
        await insertVoteModel(value, coment, userId, attendanceId);

        res.status(201).send({
            status: 'ok',
            message: `La sesión con id ${attendanceId} ha sido calificada con un valor de ${value} sobre un total de 5 puntos`,
        });
    } catch (error) {
        next(error);
    }
};

export default newVoteController;

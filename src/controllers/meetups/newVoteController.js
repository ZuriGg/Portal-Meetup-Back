import insertVoteModel from '../../models/meetups/insertVoteModel.js';
import selectAttendanceByIdModel from '../../models/meetups/selectAttendanceByIdModel.js';

import {
    cannotVoteOwnMeetupError,
    cantVoteBeforeEventError,
    invalidVoteValueError,
} from '../../services/errorService.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import voteMeetupSchema from '../../schemas/meetups/voteMeetupSchema.js';

const newVoteController = async (req, res, next) => {
    try {
        const { attendanceId } = req.params; //id de la sesión del meetup
        const { value, coment } = req.body; //puntuación y comentario

        //aplicamos joi antes de seguir con el controlador
        await validateSchemaUtil(voteMeetupSchema, req.body);

        //Obtenemos los detalles de la sesión:
        const attendance = await selectAttendanceByIdModel(attendanceId);
        if (!attendance) {
            throw new Error('No se encontró la sesión para este ID.');
        }

        //asegurar que la fecha del meetup haya pasado
        const meetup = req.meetup; //agregamos el meetup al req en el middleware
        if (new Date() < new Date(meetup.date)) {
            throw cantVoteBeforeEventError();
        }

        // Si somos los dueños del meetup lanzamos un error.
        if (meetup.userId === req.user.id) {
            throw cannotVoteOwnMeetupError();
        }

        //insertamos voto y comentario en la BBDD
        const votesAvg = await insertVoteModel(
            value,
            coment,
            attendanceId,
            req.user.id
        );

        res.status(201).send({
            status: 'ok',
            message: `La sesión con id ${attendanceId} ha sido calificada con un valor de ${value} sobre un total de 5 puntos`,
            data: {
                votesAvg,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default newVoteController;

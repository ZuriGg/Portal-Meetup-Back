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
        console.log('Log0...');
        console.log('attendanceId:', attendanceId);
        console.log('value:', value);
        console.log('coment:', coment);

        //aplicamos joi antes de seguir con el controlador
        await validateSchemaUtil(voteMeetupSchema, req.body);
        console.log('Log1...');

        //Obtenemos los detalles de la sesión:
        const attendance = await selectAttendanceByIdModel(attendanceId);
        if (!attendance) {
            throw new Error('No se encontró la sesión para este ID.');
        }
        console.log('Log2...');

        //asegurar que la fecha de la sesión haya pasado
        if (new Date() < new Date(attendance.date)) {
            throw cantVoteBeforeEventError();
        }
        console.log('Log3...');

        //comprobar que la persona que asistió al evento es la que vota
        if (attendance.userId !== req.user.id) {
            throw new Error('no se puede votar algo a lo q no has ido'); //crear nmuevo error personalizado
        }
        console.log('Log4...');

        if (attendance.ownerUser === req.user.id) {
            throw cannotVoteOwnMeetupError();
        }

        //insertamos voto y comentario en la BBDD
        const votesAvg = await insertVoteModel(
            value,
            coment,
            attendanceId,
            req.user.id
        );
        console.log('Log5...');

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

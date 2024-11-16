import insertVoteModel from '../../models/meetups/insertVoteModel.js';
import meetupExistsController from '../../middlewares/meetupExistsController.js';

import {
    cantVoteBeforeEventError,
    invalidVoteValueError,
} from '../../services/errorService.js';

//para validar el body con el esquema proporcionado
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema concreto
import voteMeetupSchema from '../../schemas/meetups/voteMeetupSchema.js';

const newVoteController = async (req, res, next) => {
    try {
        const { attendanceId } = req.params; //id de la sesión del meetup
        const { id: userId } = req.user; // id del usuario autenticado
        const { value, coment } = req.body; //puntuación y comentario

        // aplicamos la validacion con joi antes de seguir con el controlador
        await validateSchemaUtil(voteMeetupSchema, req.body);

        //asegurar que la fecha del meetup haya pasado
        const meetup = req.meetup; //agregamos el meetup al req en el middleware
        if (new Date() < new Date(meetup.date)) {
            throw cantVoteBeforeEventError();
        }

        //aseguramos que el valor sea 1-5
        if (value < 1 || value > 5) {
            throw invalidVoteValueError();
        }

        //insertamos voto y comentario en la BBDD
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

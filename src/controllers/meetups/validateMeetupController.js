import validateMeetupModel from '../../models/meetups/validateMeetupModel.js';

import { notFoundError } from '../../services/errorService.js';

//para validar el body con el esquema proporcionado
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema concreto
import validateMeetupSchema from '../../schemas/meetups/validateMeetupSchema.js';

// Controlador para validar (Hacer público) un meetup
const validateMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;
        const { validated } = req.body;
        let mensajeValidacion = '';

        // aplicamos la validacion con joi antes de seguir con el controlador
        await validateSchemaUtil(validateMeetupSchema, req.body);

        const isValidated =
            validated === 'true' ? true : validated === 'false' ? false : null;

        console.log(`La id del meetup es: ${meetupId}`);
        console.log(`El meetup está validado? ${validated}`);

        //Ejecución del model para validar el meetup ingresado
        await validateMeetupModel(meetupId, isValidated);

        if (isValidated === null) {
            throw {
                httpStatus: 400,
                code: 'INVALID_KEY',
                message:
                    'No se ha recibido un valor "true" o "false", no se ha podido realizar la operación',
            };
        }

        if (isValidated) {
            mensajeValidacion = 'se ha validado';
        } else {
            mensajeValidacion = 'ha sido invalidado';
        }

        res.send({
            status: 'ok',
            message: `El meetup ${mensajeValidacion} correctamente`,
        });
    } catch (error) {
        next(error);
    }
};

export default validateMeetupController;

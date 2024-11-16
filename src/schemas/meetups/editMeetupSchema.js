import joi from 'joi';

// Mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema para comprobar todas las propiedades.
const newMeetupSchema = joi.object({
    title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
    description: joi.string().min(10).required().messages(joiErrorMessages),
    startDate: joi.date().min('now').required().messages(joiErrorMessages),
    oneSession: joi.boolean().default(false).messages(joiErrorMessages),
    categoryId: joi.number().integer().required().messages(joiErrorMessages),
    city: joi.string().max(50).required().messages(joiErrorMessages),
    address: joi.string().max(100).messages(joiErrorMessages),
    zip: joi
        .number()
        .integer()
        .min(1001) //mínimo para un codigo postal en España
        .max(52006) //máximo para un código postal en España
        .required()
        .messages(joiErrorMessages),
    hourMeetup: joi
        .string()
        .pattern(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/) // HH:MM
        .messages(joiErrorMessages),
    dayOfTheWeek: joi
        .string()
        .valid(
            'lunes',
            'martes',
            'miercoles',
            'jueves',
            'viernes',
            'sabado',
            'domingo'
        )
        .messages(joiErrorMessages),
    aforoMax: joi
        .number()
        .integer() //número entero
        .min(0)
        .max(80000) // grandes eventos como conciertos, festivales etc
        .messages(joiErrorMessages),
    locationId: joi.number().integer(), //número entero
});

export default newMeetupSchema;

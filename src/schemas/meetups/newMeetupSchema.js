import joi from 'joi';

// Importamos el esquema que verifica una imagen.
import imgSchema from '../imgSchema.js';

// Mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema para comprobar todas las propiedades.
const newMeetupSchema = joi.object({
    title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
    description: joi.string().min(10).required().messages(joiErrorMessages),
    startDate: joi.date().min('now').required().messages(joiErrorMessages),
    oneSession: joi.boolean().default(false).messages(joiErrorMessages),
    locationId: joi.integer().required().messages(joiErrorMessages),
    categoryId: joi.integer().required().messages(joiErrorMessages),
    city: joi.string().max(50).required().messages(joiErrorMessages),
    address: joi.string().max(100).messages(joiErrorMessages),
    notes: joi.string().max(100).required().messages(joiErrorMessages),
    zip: joi.number().length(5).required().messages(joiErrorMessages),
    hourMeetUp: joi
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
        .unsigned()
        .integer() //número entero
        .max(255) // Máximo de 255 (porque es UNSIGNED)
        .messages(joiErrorMessages),
    userId: joi
        .number() //número
        .integer() //número entero
        .required()
        .messages(joiErrorMessages),
});

export default newMeetupSchema;

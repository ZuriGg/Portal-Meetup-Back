import joi from 'joi'; // Solo importa Joi como un objeto
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias para un nuevo Meetup.
const newMeetupSchema = joi.object({
    title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
    description: joi.string().min(10).required().messages(joiErrorMessages),
    startDate: joi.date().min('now').required().messages(joiErrorMessages),
    oneSession: joi
        .boolean()
        .default(false)
        .optional()
        .messages(joiErrorMessages),
    categoryId: joi.number().integer().required().messages(joiErrorMessages),
    hourMeetUp: joi
        .string()
        .pattern(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/) // HH:MM
        .optional()
        .messages(joiErrorMessages),
    dayOfTheWeek: joi
        .string()
        .valid(
            'lunes',
            'martes',
            'miércoles',
            'jueves',
            'viernes',
            'sábado',
            'domingo'
        )
        .optional()
        .messages(joiErrorMessages),
    aforoMax: joi
        .number()
        .integer()
        .min(0) // Valor mínimo para unsigned
        .max(255) // Máximo de 255
        .optional()
        .messages(joiErrorMessages),
    userId: joi.number().integer().optional().messages(joiErrorMessages),
});

export default newMeetupSchema;

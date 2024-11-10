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
    locationId: joi.number().integer().required().messages(joiErrorMessages),
    categoryId: joi.number().integer().required().messages(joiErrorMessages),
    city: joi.string().max(50).optional().messages(joiErrorMessages),
    address: joi.string().max(100).optional().messages(joiErrorMessages),
    notes: joi.string().max(100).optional().messages(joiErrorMessages),
    zip: joi
        .number()
        .integer()
        .min(10000) // Mínimo 5 dígitos
        .max(99999) // Máximo 5 dígitos
        .optional()
        .messages(joiErrorMessages),
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

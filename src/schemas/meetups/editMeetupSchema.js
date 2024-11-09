import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const editMeetupSchema = joi.object({
    title: joi.string().min(5).max(50).optional().messages(joiErrorMessages),
    description: joi.string().min(10).optional().messages(joiErrorMessages),
    startDate: joi.date().min('now').optional().messages(joiErrorMessages),
    oneSession: joi
        .boolean()
        .default(false)
        .optional()
        .messages(joiErrorMessages),
    locationId: joi
        .integer()
        .optional()
        .when('city', { is: joi.exist(), then: joi.required() })
        .messages(joiErrorMessages),
    categoryId: joi.integer().optional().messages(joiErrorMessages),
    city: joi
        .string()
        .max(50)
        .optional()
        .when('locationId', { is: joi.exist(), then: joi.required() })
        .messages(joiErrorMessages),
    address: joi.string().max(100).optional().messages(joiErrorMessages),
    notes: joi.string().max(100).optional().messages(joiErrorMessages),
    zip: joi.number().length(5).optional().messages(joiErrorMessages),
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
            'miercoles',
            'jueves',
            'viernes',
            'sabado',
            'domingo'
        )
        .optional()
        .messages(joiErrorMessages),
    aforoMax: joi
        .number()
        .unsigned()
        .integer() //número entero
        .max(255) // Máximo de 255 (porque es UNSIGNED)
        .optional()
        .messages(joiErrorMessages),
    userId: joi
        .number() //número
        .integer() //número entero
        .optional()
        .messages(joiErrorMessages),
});

export default editMeetupSchema;

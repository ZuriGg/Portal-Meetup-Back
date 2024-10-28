import joi from 'joi';

// Mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const voteMeetupSchema = joi.object({
    value: joi
        .number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages(joiErrorMessages),
});

export default voteMeetupSchema;

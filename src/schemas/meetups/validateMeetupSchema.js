import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const validateMeetupSchema = joi.object({
    validated: joi
        .string()
        .valid('true', 'false') //que solo pueda ser 'true' o 'false'.
        .required()
        .messages(joiErrorMessages),
});

export default validateMeetupSchema;

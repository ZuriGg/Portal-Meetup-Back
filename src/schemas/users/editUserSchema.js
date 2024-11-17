import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const editUserSchema = joi.object({
    firstName: joi.string().optional().messages(joiErrorMessages),
    lastname: joi.string().optional().messages(joiErrorMessages),
    email: joi.string().email().optional().messages(joiErrorMessages),
    username: joi.string().optional().messages(joiErrorMessages),
});

export default editUserSchema;

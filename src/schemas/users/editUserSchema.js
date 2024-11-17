import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';
import imgSchema from '../imgSchema.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const editUserSchema = joi.object({
    firstName: joi.string().messages(joiErrorMessages),
    lastname: joi.string().messages(joiErrorMessages),
    email: joi.string().email().messages(joiErrorMessages),
    username: joi.string().messages(joiErrorMessages),
    password: joi.string().messages(joiErrorMessages),
});

export default editUserSchema;

//eliminamos todos los .required() porque la idea es que sea un edit opcional

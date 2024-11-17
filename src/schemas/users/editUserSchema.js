import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const editUserSchema = joi.object({
    firstName: joi.string().required().messages(joiErrorMessages),
    lastname: joi.string().required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
    username: joi.string().required().messages(joiErrorMessages),
});

export default editUserSchema;
//eliminamos todos los .required() porque la idea es que sea un edit opcional

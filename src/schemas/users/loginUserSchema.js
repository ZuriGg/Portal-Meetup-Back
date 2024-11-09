import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const loginUserSchema = joi.object({
    email: joi.string().email().required().messages(joiErrorMessages),
    password: joi.string().required().messages(joiErrorMessages),
});

export default loginUserSchema;

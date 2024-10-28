import joi from 'joi';

// Mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const newUserSchema = joi.object({
    username: joi.string().required().messages(joiErrorMessages),
    password: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
});

export default newUserSchema;

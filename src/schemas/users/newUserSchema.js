import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

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
    firstName: joi.string().required().messages(joiErrorMessages), // Agregado
    lastname: joi.string().required().messages(joiErrorMessages), // Agregado
});

export default newUserSchema;

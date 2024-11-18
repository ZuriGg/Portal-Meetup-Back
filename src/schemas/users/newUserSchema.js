import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const newUserSchema = joi.object({
    username: joi.string().required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
    password: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),

    firstName: joi.string().required().messages(joiErrorMessages),
    lastname: joi.string().required().messages(joiErrorMessages),
});

export default newUserSchema;

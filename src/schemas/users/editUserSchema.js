import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const editUserSchema = joi.object({
    firstName: joi.string().required().messages(joiErrorMessages),
    lastname: joi.string().required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
    username: joi.string().required().messages(joiErrorMessages),
});

export default editUserSchema;

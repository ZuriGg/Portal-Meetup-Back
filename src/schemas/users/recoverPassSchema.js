import joi from 'joi';

//importa los errores personalizados de joi
import joiErrorMessages from '../joiErrorMessages.js';

const recoverPassSchema = joi
    .object({
        email: joi.string().email().required(),
    })
    .messages(joiErrorMessages);

export default recoverPassSchema;

//con esta función aseguramos que lo que recibimos en este endpoint de recuperación de contraseña sea un email

import joi from 'joi';

// Importamos mensajes de error personalizados.
import joiErrorMessages from './joiErrorMessages.js';

// Esquema para validar imágenes
const imgSchema = joi
    .object({
        name: joi.string().required().messages(joiErrorMessages),
        mimetype: joi
            .string()
            .valid('image/jpeg', 'image/png')
            .required()
            .messages(joiErrorMessages),
        size: joi.number().max(5000000).required().messages(joiErrorMessages),
    })
    .unknown(true);

export default imgSchema;

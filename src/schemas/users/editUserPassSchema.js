import joi from 'joi';

// Mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const editUserPassSchema = joi.object({
    recoverPassCode: joi.string().required().messages(joiErrorMessages),
    newPass: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
});

export default editUserPassSchema;

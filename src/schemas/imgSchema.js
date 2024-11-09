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
        size: joi.number().max(5000000).required().messages(joiErrorMessages), // Cuando se llama al método .messages() y se le pasa joiErrorMessages, se están asignando los mensajes de error personalizados a las reglas de validación de Joi.
    })
    .unknown(true); //permite que el esquema acepte propiedades adicionales que no están definidas explícitamente en el esquema.

export default imgSchema;

//Al llamar a joiErrorMessages, si, por ejemplo, el campo name está vacío, Joi generará un error de tipo any.required. Gracias a joiErrorMessages, en lugar de un mensaje de error genérico, se mostrará: "El campo '{#key}' es requerido", reemplazando {#key} con el nombre del campo, es decir, name.

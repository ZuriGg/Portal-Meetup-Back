import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const getUserProfileSchema = joi.object({
    // firstName: joi.string().messages(joiErrorMessages),
});

export default getUserProfileSchema;

//A LA ESPERA CONFIRMACIÓN DE SI ES NECESARIO VALIDAR CON JOI LOS PARAMS

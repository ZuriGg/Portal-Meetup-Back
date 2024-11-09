import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const invalidDayMeetupSchema = joi.object({
    date: joi
        .date()
        .iso() // Valida el formato ISO 8601 (ej. 2024-11-09T15:30:00Z)
        .required() // El campo es obligatorio porque en la base de datos es NOT NULL
        .messages(joiErrorMessages),
    notes: joi
        .string()
        .max(100)
        .optional()
        .default('Día inhabilitado: ') // Valor por defecto si no se pasa nada
        .messages(joiErrorMessages),
});

export default invalidDayMeetupSchema;

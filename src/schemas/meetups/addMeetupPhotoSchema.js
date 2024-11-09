import joi from 'joi';

// Esquema que verifica una imagen
import imgSchema from '../imgSchema.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const addMeetupPhotoSchema = joi.object({
    photo: imgSchema.optional(),
});

export default addMeetupPhotoSchema;

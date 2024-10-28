import joi from 'joi';

// Esquema que verifica una imagen.
import imgSchema from '../imgSchema.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const editUserAvatarSchema = joi.object({
    avatar: imgSchema.required(),
});

export default editUserAvatarSchema;

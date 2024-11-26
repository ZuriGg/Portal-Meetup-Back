import joi from 'joi';

// Esquema que verifica una imagen.
import imgSchema from '../imgSchema.js';

// Esquema donde comprobamos todas las propiedades necesarias.
const editMeetupImgSchema = joi.object({
    image1: imgSchema /* .required(), no es obligatorio subir un avatar*/,
    image2: imgSchema /* .required(), no es obligatorio subir un avatar*/,
    image3: imgSchema /* .required(), no es obligatorio subir un avatar*/,
});

export default editMeetupImgSchema;

//con esta función se obliga a que lo que se envíe oir req.files sea una imagen

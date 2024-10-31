import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

import { saveFileError, deleteFileError } from './errorService.js';

export const savePhotoService = async (img, width) => {
    try {
        // Ruta absoluta al directorio de subida de archivos.
        const uploadsDir = path.join(process.cwd(), 'src', 'uploads');

        // Creamos un objeto de tipo Sharp con la imagen recibida.
        const sharpImg = sharp(img.data);

        // Redimensionamos la imagen
        sharpImg.resize(width);

        // Generamos un nombre único para la imagen:
        const imgName = `${uuid()}.jpg`;

        // Ruta absoluta a la imagen.
        const imgPath = path.join(uploadsDir, imgName);

        // Guardamos la imagen en la carpeta de subida de archivos.
        await sharpImg.toFile(imgPath);

        // Retornamos el nombre con el que hemos guardado la imagen.
        return imgName;
    } catch (err) {
        console.error(err);
        saveFileError();
    }
};

export const deletePhotoService = async (imgName) => {
    try {
        // Ruta absoluta al archivo para eliminar:
        const imgPath = path.join(process.cwd(), 'src', 'uploads', imgName);

        // Eliminamos erl archivo de la carpeta de subida de archivos.
        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        deleteFileError();
    }
};

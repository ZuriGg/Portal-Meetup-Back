import { v4 as uuid } from 'uuid';

import getPool from '../../database/getPool.js';

// Realizamos una consulta a la BBDD para agregar una foto a un meetup.
const insertPhotoModel = async (url, meetupId) => {
    const pool = await getPool();

    // Generamos el id de la foto.
    const photoId = uuid();

    // Insertamos la foto.
    await pool.query(
        `INSERT INTO meetupPhotos(id, url, meetupId) VALUES(?, ?, ?)`,
        [photoId, url, meetupId]
    );

    return photoId;
};

export default insertPhotoModel;

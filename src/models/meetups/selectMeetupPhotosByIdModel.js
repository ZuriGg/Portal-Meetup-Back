import getPool from '../../database/getPool.js';
import { notFoundError } from '../../services/errorService.js';

// Realizamos una consulta a BBDD para seleccionar a un usuario con un id dado.
const selectMeetupPhotosByIdModel = async (meetupId, photoId) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el email proporcionado.
    const [meetupPhoto] = await pool.query(
        `SELECT * FROM meetupPhotos WHERE meetupId = ? AND id = ?`,
        [meetupId, photoId]
    );

    if (meetupPhoto.length === 0) {
        throw notFoundError('meetupPhoto');
    }

    // El array de usuarios solo podrá contener 1 usuario xq el email no puede repetirse. Usuario de la posición 0
    return meetupPhoto;
};

export default selectMeetupPhotosByIdModel;

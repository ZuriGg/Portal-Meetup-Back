import getPool from '../../database/getPool.js';
import { notFoundError } from '../../services/errorService.js';

const selectMeetupPhotosByIdModel = async (meetupId, photoId) => {
    const pool = await getPool();

    // Realizamos la consulta para buscar la foto
    const [meetupPhoto] = await pool.query(
        `SELECT * FROM meetupPhotos WHERE meetupId = ? AND id = ?`,
        [meetupId, photoId]
    );

    if (meetupPhoto.length === 0) {
        // Si no se encuentra la foto, devolvemos null
        return null;
    }

    return meetupPhoto[0]; // Devolvemos el primer resultado (solo puede haber uno)
};

export default selectMeetupPhotosByIdModel;

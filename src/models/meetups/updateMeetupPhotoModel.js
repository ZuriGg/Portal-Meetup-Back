import getPool from '../../database/getPool.js';

const updateMeetupPhotoModel = async (meetupPhotoName, meetupId, photoId) => {
    const pool = await getPool();

    // Verifica si ya existe el registro con el meetupId y photoId
    const [existingPhoto] = await pool.query(
        `SELECT id FROM meetupPhotos WHERE meetupId = ? AND id = ?`,
        [meetupId, photoId]
    );

    if (existingPhoto.length > 0) {
        // Si el registro existe, realiza un UPDATE
        await pool.query(
            `UPDATE meetupPhotos SET name = ? WHERE meetupId = ? AND id = ?`,
            [meetupPhotoName, meetupId, photoId]
        );
    } else {
        // Si no existe, realiza un INSERT
        await pool.query(
            `INSERT INTO meetupPhotos (name, meetupId) VALUES (?, ?)`,
            [meetupPhotoName, meetupId]
        );
    }
};

export default updateMeetupPhotoModel;

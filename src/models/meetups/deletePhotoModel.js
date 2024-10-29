import getPool from '../../database/getPool.js';

// Realizamos una consulta a la BBDD para eliminar una foto de un meetup.
const deletePhotoModel = async (photoId) => {
    const pool = await getPool();

    // Eliminamos la foto.
    await pool.query(`DELETE FROM meetupPhotos WHERE id = ?`, [photoId]);
};

export default deletePhotoModel;

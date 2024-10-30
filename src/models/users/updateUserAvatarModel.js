import getPool from '../../database/getPool.js';

// Realizamos una consulta a BBDD para actualizar el avatar de un usuario.
const updateUserAvatarModel = async (avatarName, userId) => {
    const pool = await getPool();

    await pool.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
        avatarName,
        userId,
    ]);
};

export default updateUserAvatarModel;

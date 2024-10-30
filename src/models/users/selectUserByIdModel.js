import getPool from '../../database/getPool.js';

// Realizamos una consulta a BBDD para seleccionar a un usuario con un id dado.
const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el email proporcionado.
    const [users] = await pool.query(
        `SELECT id, username, email, avatar, createdAt FROM users WHERE id = ?`,
        [userId]
    );

    // El array de usuarios solo podrá contener 1 usuario xq el email no puede repetirse. Retornamos al usuario que se encuentra en la posición 0,
    // es decir, retornamos el objeto en lugar de retornar un array con un elemento.
    return users[0];
};

export default selectUserByIdModel;

import getPool from '../../database/getPool.js';

// Realizamos una consulta a BBDD para seleccionar un usuario con un email dado.
const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, password, role, recoverPassCode, active FROM users WHERE email = ?`,
        [email]
    );

    // El array de usuarios solo podrá contener un único usuario dado que el email no puede repetirse
    return users[0];
};

export default selectUserByEmailModel;

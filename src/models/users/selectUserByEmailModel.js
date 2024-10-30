import getPool from '../../database/getPool.js';

// Realizamos una consulta a BBDD para seleccionar un usuario con un email dado.
const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    // Comprobamos si hay usuario con el email dado.
    const [users] = await pool.query(
        `SELECT id, password, role, recoverPassCode, active FROM users WHERE email = ?`,
        [email]
    );

    // El array de usuarios solo podrá tener 1 usuario, xq el email no puede repetirse. Retornamos al usuario que se encuentra en la posición 0,
    // es decir, retornamos el objeto en lugar de retornar un array con un elemento.
    // Si en la posición 0 no hay nada retornaremos undefined.
    return users[0];
};

export default selectUserByEmailModel;

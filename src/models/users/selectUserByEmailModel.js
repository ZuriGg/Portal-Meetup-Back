import getPool from '../../database/getPool.js';
import { notFoundError } from '../../services/errorService.js';

// Realizamos una consulta a BBDD para seleccionar un usuario con un email dado.
// Función que realiza una consulta a la base de datos para seleccionar a un usuario con un id dado.
const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el email proporcionado.
    const [users] = await pool.query(
        `SELECT id, username, email, avatar, createdAt FROM users WHERE id = ?`,
        [userId]
    );

    // El array de usuarios solo podrá contener un único usuario dado que el email
    // no puede repetirse. Retornamos al usuario que se encuentra en la posición 0,
    // es decir, retornamos el objeto en lugar de retornar un array con un elemento.
    return users[0];
};

export default selectUserByIdModel;

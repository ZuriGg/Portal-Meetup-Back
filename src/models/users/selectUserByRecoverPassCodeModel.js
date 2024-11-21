import getPool from '../../database/getPool.js';
import { notFoundError } from '../../services/errorService.js';

// Realizamos una consulta a BBDD para seleccionar a un usuario con un recover pass dado.
const selectUserByRecoverPassModel = async (recoverPassCode) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el recoverPassCode proporcionado.
    const [users] = await pool.query(
        `SELECT id, username, email, avatar, firstName, lastname, password, active, role, registrationCode, recoverPassCode, modifiedAt, createdAt FROM users WHERE recoverPassCode = ?`,
        [recoverPassCode]
    );

    if (users.length === 0) {
        throw notFoundError('usuario según el código de recuperación');
    }

    // El array de usuarios solo podrá contener 1 usuario xq el email no puede repetirse. Usuario de la posición 0
    return users[0];
};

export default selectUserByRecoverPassModel;

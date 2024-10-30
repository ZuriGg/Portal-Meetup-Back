import getPool from '../../database/getPool.js';

// Importamos los errores.
import { notFoundError } from '../../services/errorService.js';

// Realizamos una consulta a BBDD para activar un usuario.
const updateUserRegCodeModel = async (registrationCode) => {
    const pool = await getPool();

    // Comprobamos si existe un usuario con ese código de registro.
    const [users] = await pool.query(
        `SELECT id FROM users WHERE registrationCode = ?`,
        [registrationCode]
    );

    // Si no existe ningún usuario con ese código de registro lanzamos un error.
    if (users.length < 1) {
        notFoundError('usuario');
    }

    // Actualizamos el usuario.
    await pool.query(
        `UPDATE users SET active = true, registrationCode = null WHERE registrationCode = ?`,
        [registrationCode]
    );
};

export default updateUserRegCodeModel;

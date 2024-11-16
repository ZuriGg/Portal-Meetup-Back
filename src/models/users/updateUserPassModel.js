import bcrypt from 'bcrypt';

import getPool from '../../database/getPool.js';

// Importamos los modelos.
import selectUserByEmailModel from './selectUserByEmailModel.js';

// Importamos los servicios.
import { recoveryCodeError } from '../../services/errorService.js';

//Realización de una consulta a BBDD para actualizar la contraseña de un usuario.
const updateUserPassModel = async (recoverPassCode, newPass) => {
    const pool = await getPool();
    //he elimando el email tanto de la req como de la logica general
    // Si no encontramos ningún usuario o si el código es incorrecto lanzamos un error.

    // Encriptamos la nueva contraseña.
    const hashedPass = await bcrypt.hash(newPass, 10);

    // Actualizamos el usuario.
    await pool.query(
        `UPDATE users SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`,
        [hashedPass, recoverPassCode]
    );
};

export default updateUserPassModel;

import getPool from '../../database/getPool.js';
import bcrypt from 'bcrypt';

const editUserModel = async (firstName, lastname, username, email, userId) => {
    const pool = await getPool();

    const query = `
        UPDATE users
        SET firstName = ?, lastname = ?, username = ?, email = ?
        WHERE id = ?
    `;
    const values = [firstName, lastname, username, email, userId];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
        throw new Error('No se pudo actualizar el usuario');
    }

    return result;
};

export default editUserModel;

import getPool from '../../database/getPool.js';
import { cantEditUser } from '../../services/errorService.js';

const editUserModel = async (firstName, lastname, username, email, userId) => {
    const pool = await getPool();

    console.log(`${email} de model`); //comprobación

    const query = `
    UPDATE users
    SET firstName = ?, lastname = ?, username = ?, email = ?
    WHERE id = ?
`;
    const values = [firstName, lastname, username, email, userId];

    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) {
        throw cantEditUser();
    }
    return result;
};

export default editUserModel;

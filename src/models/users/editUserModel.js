import getPool from '../../database/getPool.js';
import bcrypt from 'bcrypt';

const editUserModel = async (firstName, lastname, username, email, userId) => {
    const pool = await getPool();

    console.log(`${email} de model`);

    await pool.query(
        `
            UPDATE users
            SET firstName=?, lastname=?, username=?, email=?
            WHERE id=?
        `,
        [firstName, lastname, username, email, userId]
    );
};

export default editUserModel;

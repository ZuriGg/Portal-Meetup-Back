import getPool from '../../database/getPool.js';
import bcrypt from 'bcrypt';

const editUserModel = async (
    firstName,
    lastname,
    username,
    email,
    password,
    avatar,
    userId
) => {
    const pool = await getPool();

    const hashedPass = await bcrypt.hash(password, 10);

    console.log(`${email} de model`);

    await pool.query(
        `
            UPDATE users
            SET firstName=?, lastname=?, username=?, password=?, avatar=?, email=?
            WHERE id=?
        `,
        [firstName, lastname, username, hashedPass, avatar, email, userId]
    );
};

export default editUserModel;

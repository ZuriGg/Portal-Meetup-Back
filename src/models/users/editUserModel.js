import getPool from '../../database/getPool.js';

const editUserModel = async (
    firstName,
    lastname,
    username,
    password,
    avatar,
    email,
    userId
) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE users
            SET firstName=?, lastname=?, username=?, password=?, avatar=?, email=?
            WHERE id=?
        `,
        [firstName, lastname, username, password, avatar, email, userId]
    );
};

export default editUserModel;

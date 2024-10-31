import getPool from '../../database/getPool.js';

const editUserModel = async (
    firstName,
    lastName,
    username,
    password,
    avatar,
    userId
) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE users
            SET firstName=?, lastName=?, username=?, password=?, avatar=?
            WHERE id=?
        `,
        [firstName, lastName, username, password, avatar, userId]
    );
};

export default editUserModel;

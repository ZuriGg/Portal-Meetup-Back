import getPool from '../../database/getPool.js';

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

    console.log(`${email} de model`);

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

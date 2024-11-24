import getPool from '../../database/getPool.js';

const selectAllUsersModel = async () => {
    const pool = await getPool();

    const [users] = await pool.query(
        `
            SELECT * FROM users
        `
    );

    return users;
};

export default selectAllUsersModel;

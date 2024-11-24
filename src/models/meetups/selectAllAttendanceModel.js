import getPool from '../../database/getPool.js';

const selectAllAttendanceModel = async () => {
    const pool = await getPool();

    const [attendance] = await pool.query(
        `
            SELECT * FROM attendance
        `
    );

    return attendance;
};

export default selectAllAttendanceModel;

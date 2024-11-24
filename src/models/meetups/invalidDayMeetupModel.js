import getPool from '../../database/getPool.js';

const invalidDayMeetupModel = async (attendanceId, date, notes) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `INSERT INTO outOfService (notes, date, attendanceId) VALUES (?, ?, ?)`,
        [notes, date, attendanceId]
    );

    return result.insertId;
};

export default invalidDayMeetupModel;

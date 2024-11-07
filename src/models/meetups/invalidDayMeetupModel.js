import getPool from '../../database/getPool.js';

const invalidDayMeetupModel = async (meetupId, date, notes) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `INSERT INTO outOfService (notes, date, meetupId) VALUES (?, ?, ?)`,
        [notes, date, meetupId]
    );

    return result.insertId;
};

export default invalidDayMeetupModel;

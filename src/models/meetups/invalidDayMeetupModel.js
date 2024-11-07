import getPool from '../../database/getPool.js';

const invalidDayMeetupModel = async (meetupId, date) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `INSERT INTO outOfService (notes, date, meetupId) VALUES (?, ?, ?)`,
        ['Día inhabilitado', date, meetupId]
    );

    return result.insertId;
};

export default invalidDayMeetupModel;

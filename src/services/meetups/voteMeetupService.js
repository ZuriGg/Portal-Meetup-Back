import getPool from '../../database/getPool.js';

const voteMeetupService = async (date, userId, meetupId) => {
    const pool = getPool();

    await pool.query(
        `
        INSERT INTO attendance (id, date, userId, meetupId)
        VALUES (UUID(), ?, ?, ?)
        `,
        [date, userId, meetupId]
    );
};

export default voteMeetupService;

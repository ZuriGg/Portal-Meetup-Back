import getPool from '../../database/getPool.js';

const cancelMeetUpRegistrationService = async (userId, meetupId) => {
    const pool = getPool();

    await pool.query(
        `
                DELETE FROM attendance WHERE userId = ? AND meetupId=?
            `,
        [userId, meetupId]
    );
};

export default cancelMeetUpRegistrationService;

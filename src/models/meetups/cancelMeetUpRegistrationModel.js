import getPool from '../../database/getPool.js';

const cancelMeetUpRegistrationModel = async (userId, meetupId) => {
    const pool = await getPool();

    await pool.query(
        `
        DELETE FROM attendance WHERE userId = ? AND meetupId=?
            `,
        [userId, meetupId]
    );
};

export default cancelMeetUpRegistrationModel;

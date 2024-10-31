import getPool from '../../database/getPool.js';

const deleteMeetupModel = async (MeetupId) => {
    const pool = await getPool();

    await pool.query(`DELETE FROM meetups WHERE id=?`, [MeetupId]);
};

export default deleteMeetupModel;

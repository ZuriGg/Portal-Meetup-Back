import getPool from '../../database/getPool.js';

const newVoteModel = async () => {
    const pool = await getPool();
    await pool.query(`SSJJSJ`, [DSD]);
};

export default newVoteModel;

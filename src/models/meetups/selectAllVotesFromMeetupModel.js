import getPool from '../../database/getPool.js';

const selectAllVotesFromMeetupModel = async () => {
    const pool = await getPool();

    const [votes] = await pool.query(
        `
            SELECT * FROM meetupVotes
        `
    );

    return votes;
};

export default selectAllVotesFromMeetupModel;

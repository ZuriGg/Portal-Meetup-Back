import getPool from '../../database/getPool.js';

const selectVotesByUserIdModel = async (userId) => {
    const pool = await getPool();

    const [votes] = await pool.query(
        `
        SELECT 
            mv.id, 
            mv.value, 
            mv.coment, 
            mv.createdAt, 
            m.title AS meetupTitle 
        FROM 
            meetupVotes mv
        JOIN 
            attendance a ON mv.attendanceId = a.id
        JOIN 
            meetups m ON a.meetupId = m.id
        WHERE 
            mv.userId = ?
        ORDER BY 
            mv.createdAt DESC
        `,
        [userId]
    );

    return votes;
};

export default selectVotesByUserIdModel;

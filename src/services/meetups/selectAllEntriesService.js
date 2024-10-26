import getPool from '../../database/getPool.js';

const selectAllEntriesMeetUpService = async () => {
    const pool = getPool();

    const [meetups] = await pool.query(
        `
            SELECT m.meetupid, m.title, m.idLocation, idUser, AVG(IFNULL(v.value,0)) AS votes, m.createdAt
            FROM meetups m
            LEFT JOIN meetup_votes v ON v.meetupid = m.id
            INNER JOIN  users u ON u.id = m.userId
            GROUP BY m.id 
            ORDER BY m.createdAt DESC
        `
    );

    for (let meetup of meetups) {
        const [photos] = await pool.query(
            `
                SELECT id, name FROM meetup_photos WHERE meetupId=?
            `,
            [meetup.id]
        );

        meetup.photos = photos;
    }
    return meetups;
};

export default selectAllEntriesMeetUpService;

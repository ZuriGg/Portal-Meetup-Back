import getPool from '../../database/getPool.js';

const insertMeetUpEntryService = async (
    title,
    description,
    startDate,
    category,
    idLocation,
    hourMeetUp,
    aforoMax,
    meetUpPhotos
) => {
    const pool = await getPool();
    const [result] = await pool.query(
        `INSERT INTO meetups (title,
    description,
    startDate,
    category,
    idLocation,
    hourMeetUp,
    aforoMax,
    meetUpPhotos) VALUES (?,?,?,?,?,?,?,?)`,
        [
            title,
            description,
            startDate,
            category,
            idLocation,
            hourMeetUp,
            aforoMax,
            meetUpPhotos,
        ]
    );
    console.log(result);
    const { insertId } = result;
    return insertId;
};

export default insertMeetUpEntryService;

import getPool from '../../database/getPool.js';

const editMeetupModel = async (
    title,
    description,
    startDate,
    oneSession,
    hourMeetup,
    dayOfTheWeek,
    aforoMax,
    locationId,
    categoryId,
    modifiedAt,
    entryId
) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE meetups
            SET title=?, description=?, startDate=?, oneSession=?, hourMeetup=?, dayOfTheWeek=?, aforoMax=?, locationId=?, categoryId=?, modifiedAt=?, 
            WHERE id=?
        `,
        [
            title,
            description,
            startDate,
            oneSession,
            hourMeetup,
            dayOfTheWeek,
            aforoMax,
            locationId,
            categoryId,
            modifiedAt,
            entryId,
        ]
    );
};

export default editMeetupModel;

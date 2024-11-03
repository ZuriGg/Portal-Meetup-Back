import getPool from '../../database/getPool.js';

const editMeetupModel = async (
    title,
    description,
    startDate,
    oneSession,
    categoryId,
    locationId,
    city,
    address,
    notes,
    zip,
    userId,
    owner,
    hourMeetUp,
    dayOfTheWeek,
    aforoMax,
    meetupId
) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE meetups 
            SET title=?, description=?, startDate=?, oneSession=?, hourMeetup=?, dayOfTheWeek=?, aforoMax=?, locationId=?, categoryId=?,userId=?,owner=? 
            WHERE id=?
        `,
        [
            title,
            description,
            startDate,
            oneSession,
            hourMeetUp,
            dayOfTheWeek,
            aforoMax,
            locationId,
            categoryId,
            userId,
            owner,
            meetupId,
        ]
    );
};

export default editMeetupModel;

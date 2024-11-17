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
    zip,
    hourMeetup,
    dayOfTheWeek,
    aforoMax,
    meetupId
) => {
    const pool = await getPool();

    await pool.query(
        `UPDATE location 
        SET city=?, address=?, zip=? 
        WHERE id=?`,
        [city, address, zip, locationId]
    );

    await pool.query(
        `
            UPDATE meetups 
            SET title=?, description=?, startDate=?, oneSession=?, categoryId=?, hourMeetup=?, dayOfTheWeek=?, aforoMax=?   
            WHERE id=?
        `,
        [
            title,
            description,
            startDate,
            oneSession,
            categoryId,
            hourMeetup,
            dayOfTheWeek,
            aforoMax,
            meetupId,
        ]
    );
};

export default editMeetupModel;

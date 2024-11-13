import getPool from '../../database/getPool.js';

const insertMeetupModel = async (
    title,
    description,
    startDate,
    oneSession,
    categoryId,
    city,
    address,
    zip,
    hourMeetup,
    dayOfTheWeek,
    aforoMax,
    userId
) => {
    const pool = await getPool();

    // Inserta la ubicación y obtiene el idLocation
    const [locationResult] = await pool.query(
        `INSERT INTO location (city, address, zip) VALUES (?, ?, ?)`,
        [city, address, zip]
    );
    const locationId = locationResult.insertId;

    // Inserta el meetup usando el idLocation obtenido
    const [meetupResult] = await pool.query(
        `INSERT INTO meetups (
            title,
            description,
            startDate,
            oneSession,
            categoryId,
            locationId,
            hourMeetup,
            dayOfTheWeek,
            aforoMax, 
            userId
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            description,
            startDate,
            oneSession,
            categoryId,
            locationId,
            hourMeetup,
            dayOfTheWeek,
            aforoMax,
            userId,
        ]
    );

    const { insertId } = meetupResult;
    return insertId;
};

export default insertMeetupModel;

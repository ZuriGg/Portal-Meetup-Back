import getPool from '../../database/getPool.js';

const insertMeetupModel = async (
    title,
    description,
    startDate,
    oneSession,
    category,
    city,
    address,
    notes,
    zip,
    userId,
    hourMeetUp,
    dayOfTheWeek,
    aforoMax
) => {
    const pool = await getPool();

    // Inserta la ubicación y obtiene el idLocation
    const [locationResult] = await pool.query(
        `INSERT INTO location (city, address, notes, zip) VALUES (?, ?, ?, ?)`,
        [city, address, notes, zip]
    );
    const idLocation = locationResult.insertId;

    // Inserta el meetup usando el idLocation obtenido
    const [meetupResult] = await pool.query(
        `INSERT INTO meetups (
            title,
            description,
            startDate,
            oneSession,
            categoryId,
            idLocation,
            hourMeetUp,
            dayOfTheWeek,
            aforoMax,
            userId,
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            description,
            startDate,
            oneSession,
            category,
            idLocation,
            hourMeetUp,
            dayOfTheWeek,
            aforoMax,
            userId,
        ]
    );

    /* console.log(meetupResult); */
    // const { insertId } = meetupResult;
    // return insertId;
};

export default insertMeetupModel;

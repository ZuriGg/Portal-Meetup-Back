import getPool from '../../database/getPool.js';

const insertMeetUpEntryService = async (
    title,
    description,
    startDate,
    category,
    city,
    address,
    notes,
    zip,
    userId,
    hourMeetUp,
    aforoMax,
    meetUpPhotos
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
            category,
            idLocation,
            hourMeetUp,
            aforoMax,
            userId,
            meetUpPhotos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            description,
            startDate,
            category,
            idLocation,
            hourMeetUp,
            aforoMax,
            userId,
            meetUpPhotos,
        ]
    );

    console.log(meetupResult);
    // const { insertId } = meetupResult;
    // return insertId;
};

export default insertMeetUpEntryService;

import { v4 as uuid } from 'uuid';

import getPool from '../../database/getPool.js';

// Realizamos una consulta a la BBDD para agregar una nueva entrada.
const insertMeetupModel = async (
    title,
    description,
    startDate,
    oneSession,
    hourMeetup,
    dayOfTheWeek,
    aforoMax,
    userId,
    locationId,
    categoryId
) => {
    const pool = await getPool();

    // Generamos el id del meetup.
    const meetupId = uuid();

    // Insertamos el meetup.
    await pool.query(
        `INSERT INTO meetups(id, title, description, startDate, oneSession, hourMeetup, dayOfTheWeek, aforoMax, userId, locationId, categoryId) VALUES(?, ?, ?, ?, ?)`,
        [
            meetupId,
            title,
            description,
            startDate,
            oneSession,
            hourMeetup,
            dayOfTheWeek,
            aforoMax,
            userId,
            locationId,
            categoryId,
        ]
    );

    // Retornamos id del meetup.
    return meetupId;
};

export default insertMeetupModel;

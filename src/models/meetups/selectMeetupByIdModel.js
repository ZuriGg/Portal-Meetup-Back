import getPool from '../../database/getPool.js';
import { notFoundError } from '../../services/errorService.js';

// Realizamos una consulta a la BBDD para obtener información de un meetup concreto.
const selectMeetupByIdModel = async (meetupId, userId = '') => {
    const pool = await getPool();

    // Obtenemos la información del meetup.
    const [meetups] = await pool.query(
        `
                SELECT 
                    M.id,
                    M.title,
                    M.description,
                    M.startDate,
                    M.oneSession,
                    M.hourMeetup,
                    M.dayOfTheWeek,
                    M.aforoMax,
                    M.userId,
                    U.username,
                    BIT_OR(V.userId = ?) AS votedByMe, 
                    M.userId = ? AS owner,
                    AVG(IFNULL(V.value, 0)) AS votes,
                    M.createdAt
                FROM meetups M
                LEFT JOIN meetupVotes V ON V.meetupId = M.id
                INNER JOIN users U ON U.id = M.userId
                WHERE M.id = ?
                GROUP BY M.id
                ORDER BY M.createdAt DESC
            `,
        [userId, userId, meetupId]
    );

    // Verifica que el meetup exista
    if (meetups.length === 0) {
        return notFoundError(); // o lanza un error si prefieres
    }

    // Obtenemos el array de fotos del meetup.
    const [photos] = await pool.query(
        `SELECT id, name FROM meetupPhotos WHERE meetupId = ?`,
        [meetupId]
    );

    // Agregamos el array de fotos al meetup.
    meetups[0].photos = photos;

    // Establecemos como valores booleanos "votedByMe" y "owner"
    meetups[0].votedByMe = Boolean(meetups[0].votedByMe);
    meetups[0].owner = Boolean(meetups[0].owner);

    // La media de votos es un valor de tipo String. La convertimos a Number.
    meetups[0].votes = Number(meetups[0].votes) || 0;

    return {
        ...meetups[0],
        photos,
    };
};

export default selectMeetupByIdModel;

/* La función selectMeetupByIdModel obtiene información detallada de un "meetup" específico a partir de su ID.  */

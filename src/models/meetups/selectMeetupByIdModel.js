import getPool from '../../database/getPool.js';
import { notFoundError } from '../../services/errorService.js';

// Realizamos una consulta a la BBDD para obtener información de un meetup concreto.
const selectMeetupByIdModel = async (meetupId, userId = '') => {
    const pool = await getPool();

    // Obtenemos la información del meetup.
    const [meetups] = await pool.query('SELECT * FROM meetups WHERE id = ?', [
        meetupId,
    ]);

    // Verifica que el meetup exista
    if (meetups.length === 0) {
        return notFoundError(); // o lanza un error si prefieres
    }

    // Obtenemos el array de fotos del meetup.
/*     const [photos] = await pool.query(
        `SELECT id, name FROM meetupPhotos WHERE meetupId = ?`,
        [meetupId]
    ); */

    // Agregamos el array de fotos al meetup.
/*     meetups[0].photos = photos; */

    // Establecemos como valores booleanos "votedByMe" y "owner"
    /*     meetups[0].votedByMe = Boolean(meetups[0].votedByMe);
    meetups[0].owner = Boolean(meetups[0].owner); */

    // La media de votos es un valor de tipo String. La convertimos a Number.
    /*     meetups[0].votes = Number(meetups[0].votes) || 0; */

    return {
        ...meetups[0],
        /* photos, */
    };
};

export default selectMeetupByIdModel;

/* La función selectMeetupByIdModel obtiene información detallada de un "meetup" específico a partir de su ID. xxx */

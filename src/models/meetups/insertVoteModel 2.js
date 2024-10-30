import { v4 as uuid } from 'uuid';

import getPool from '../../database/getPool.js';

// Importamos los errores.
import { voteAlreadyExistsError } from '../../services/errorService.js';

// Realizamos una consulta a la BBDD para votar un meetup.
const insertVoteModel = async (value, attendanceId, userId) => {
    const pool = await getPool();

    // Comprobamos si ya existe un voto previo por parte del usuario que está intentando votar.
    const [votes] = await pool.query(
        `SELECT id FROM meetupVotes WHERE userId = ? AND attendanceId = ?`,
        [userId, attendanceId]
    );

    // Si la longitud del array de votos es mayor que 0 lanzamos un error indicando que la entrada ya ha sido votada por este usuario.
    if (votes.length > 0) {
        voteAlreadyExistsError();
    }

    // Insertamos el voto.
    await pool.query(
        `INSERT INTO meetupVotes(id, value, attendanceId, userId) VALUES(?, ?, ?, ?)`,
        [uuid(), value, attendanceId, userId]
    );

    // Obtenemos la media de votos.
    const [votesAvg] = await pool.query(
        `SELECT AVG(value) AS avg FROM meetupVotes WHERE attendanceId = ?`,
        [attendanceId]
    );

    // Retornamos la media de votos.
    return Number(votesAvg[0].avg);
};

export default insertVoteModel;

import getPool from '../../database/getPool.js';
import { voteAlreadyExistsError } from '../../services/errorService.js';

const insertVoteModel = async (value, coment, attendanceId, userId) => {
    try {
        const pool = await getPool();

        // Verificar si el usuario ya ha votado en esta asistencia
        const [votes] = await pool.query(
            `SELECT id FROM meetupVotes WHERE userId = ? AND attendanceId = ?`,
            [userId, attendanceId]
        );

        if (votes.length > 0) {
            throw voteAlreadyExistsError();
        }

        // Insertar el voto en la base de datos
        await pool.query(
            `INSERT INTO meetupVotes (value, coment, userId, attendanceId) VALUES (?, ?, ?, ?)`,
            [value, coment, userId, attendanceId]
        );

        // Calcular la nueva media de votos para el meetup relacionado
        const [votesAvg] = await pool.query(
            `SELECT AVG(value) AS avg FROM meetupVotes 
             JOIN attendance ON meetupVotes.attendanceId = attendance.id 
             WHERE attendance.meetupId = ?`,
            [attendanceId] // Cambiar por el meetupId relacionado
        );

        // Retornar la media de los votos
        return Number(votesAvg[0].avg);
    } catch (error) {
        throw error;
    }
};

export default insertVoteModel;

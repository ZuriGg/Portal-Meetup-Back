import getPool from '../../database/getPool.js';
import { notFoundError } from '../../services/errorService.js';

// Realizamos una consulta a la BBDD para obtener información de un meetup concreto.
const selectAttendanceByIdModel = async (attendanceId) => {
    const pool = await getPool();

    // Obtenemos la información de la sesión.
    const [attendance] = await pool.query(
        `
        SELECT A.id, A.date, A.userId, M.userId AS ownerUser
        FROM attendance AS A
        JOIN meetups AS M ON M.id = A.meetupId
        WHERE A.id = ?;
        `,
        [attendanceId]
    );

    //impedir que el dueño de un evento pueda votarlo

    // Verifica que la sesión exista
    if (attendance.length === 0) {
        return notFoundError();
    }

    return {
        ...attendance[0],
    };
};

export default selectAttendanceByIdModel;

/* selectAttendanceByIdModel --> obtiene información detallada de una "sesión" específica a partir de su ID */

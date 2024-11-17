import getPool from '../../database/getPool.js';
import { notFoundError } from '../../services/errorService.js';

// Realizamos una consulta a la BBDD para obtener información de un meetup concreto.
const selectAttendanceByIdModel = async (attendanceId) => {
    const pool = await getPool();

    // Obtenemos la información de la sesión.
    const [attendance] = await pool.query(
        'SELECT * FROM attendance WHERE id = ?',
        [attendanceId]
    );

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

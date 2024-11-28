import getPool from '../../database/getPool.js';

const insertInscriptionModel = async (user, meetupId, date) => {
    const pool = await getPool();

    // Verificar si ya existe una inscripción con los mismos datos
    const [existingAttendance] = await pool.query(
        `SELECT * FROM attendance WHERE userId = ? AND meetupId = ? AND date = ?`,
        [user, meetupId, date]
    );

    if (existingAttendance.length > 0) {
        throw new Error('Ya estás inscrito para este meetup en esta fecha.');
    }

    // Insertar si no hay duplicados
    await pool.query(
        `INSERT INTO attendance (date, meetupId, userId) VALUES (?, ?, ?)`,
        [date, meetupId, user]
    );
};

export default insertInscriptionModel;

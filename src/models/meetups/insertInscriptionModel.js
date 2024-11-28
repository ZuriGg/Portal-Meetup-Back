import getPool from '../../database/getPool.js';
import { notFoundError } from '../../services/errorService.js';
import sendMailUtil from '../../utils/sendMailUtil.js';

const insertInscriptionModel = async (user, meetupId, date) => {
    const pool = await getPool();

    // Obtener título y categoría del meetup
    const [meetupData] = await pool.query(
        `SELECT m.title, c.name AS categoryName
         FROM meetups m
         JOIN category c ON m.categoryId = c.id
         WHERE m.id = ?`,
        [meetupId]
    );

    // Verificar si los datos del meetup fueron encontrados
    if (!meetupData) {
        throw notFoundError('meetup');
    }

    // Información del meetup
    const { title, categoryName } = meetupData;

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

    //obtenemos el nombre de usuario para personalizar el email
    const [userData] = await pool.query(
        `SELECT username, email FROM users WHERE id = ?`,
        [user]
    );

    const { username, email } = userData;

    // Creamos el asunto del email de confirmación.
    const emailSubject =
        '❤️ Inscripción satisfactoria para el evento "${title}" ❤️';

    // Creamos el contenido del email
    const emailBody = `
             ¡Buenas, ${username}!
 
             💌 ¡Se ha inscrito correctamente a la sesión del meetup "${title}" de la categoría "${categoryName}"!<br>
             📅 Fecha de la sesión: ${date}<br>
             ➡️ Si desea ver más detalles o realizar algún cambio, puede hacerlo a través de su cuenta.<br>
 
            ¡Nos vemos pronto en el evento!

        Un saludo,<br>
        El equipo de Meetup
         `;

    // Enviamos el email de confirmación al usuario.
    await sendMailUtil(email, emailSubject, emailBody);
};

export default insertInscriptionModel;

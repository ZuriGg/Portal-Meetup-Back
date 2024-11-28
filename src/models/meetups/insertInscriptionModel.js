import getPool from '../../database/getPool.js';
import {
    attendanceAlreadyRegistered,
    notFoundError,
    sendEmailError,
} from '../../services/errorService.js';
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

    console.log('Datos del meetup:', meetupData);

    // Verificar si los datos del meetup fueron encontrados
    if (!meetupData || meetupData.length === 0) {
        throw notFoundError('meetup');
    }

    // Información del meetup
    const { title, categoryName } = meetupData[0];

    // Verificar si ya existe una inscripción con los mismos datos
    const [existingAttendance] = await pool.query(
        `SELECT * FROM attendance WHERE userId = ? AND meetupId = ? AND date = ?`,
        [user, meetupId, date]
    );

    if (existingAttendance.length > 0) {
        throw attendanceAlreadyRegistered();
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

    if (!userData || userData.length === 0) {
        throw notFoundError('user');
    }
    console.log(userData);

    const { username, email } = userData[0];

    // Creamos el asunto del email de confirmación.
    const emailSubject = `❤️ Inscripción satisfactoria para el evento "${title}" ❤️`;

    // Creamos el contenido del email
    const emailBody = `
             ¡Buenas, ${username}!
 
             <p>💌 ¡Se ha inscrito correctamente a la sesión del meetup "${title}" de la categoría "${categoryName}"!</p>
             <p>📅 Fecha de la sesión: ${date}</p>
             <p>➡️ Si desea ver más detalles o realizar algún cambio, puede hacerlo a través de su cuenta.</p>
 
            <p>¡Nos vemos pronto en el evento!</p>

            <p>Un saludo,</p>
            <p>El equipo de Meetup</p>
         `;

    console.log(`Enviando correo a: ${email} con asunto: ${emailSubject}`);
    try {
        await sendMailUtil(email, emailSubject, emailBody);
        console.log('Correo enviado exitosamente');
    } catch (err) {
        console.error('Error al enviar el correo:', err);
        throw sendEmailError();
    }
};

export default insertInscriptionModel;

import getPool from '../../database/getPool.js';
import { sendEmailError } from '../../services/errorService.js';

// Importamos los servicios.
import sendMailUtil from '../../utils/sendMailUtil.js';

// Realizamos una consulta a BBDD para mandar una contraseña de recuperación.
const updateRecoverPassModel = async (email, recoverPassCode) => {
    const pool = await getPool();

    // Actualizamos el código de recuperación de contraseña del usuario.
    await pool.query(`UPDATE users SET recoverPassCode = ? WHERE email = ?`, [
        recoverPassCode,
        email,
    ]);

    // Creamos el asunto del email de recuperación de contraseña.
    const emailSubject = '❤️‍🩹Recuperación de contraseña en OurMeetup ❤️‍🩹';

    // Creamos el contenido del email
    const emailBody = `
            <p>¡Hola hola, caracona!😊</p>
            <p>Se ha solicitado la recuperación de contraseña para este email en OurMeetup.</p>

            <p>🆕 Use el siguiente código para crear una nueva contraseña: ${recoverPassCode}</p>

            <p>🦝 Si no ha sido usted, puede ignorar este email</p>

            <p>Un saludo,</p>
            <p>El equipo de OurMeetup🫂</p>

        `;

    // Enviamos el mail para recuperar la contraseña.
    try {
        await sendMailUtil(email, emailSubject, emailBody);
        console.log('Correo enviado exitosamente');
    } catch (err) {
        console.error('Error al enviar el correo:', err);
        throw sendEmailError();
    }
};

export default updateRecoverPassModel;

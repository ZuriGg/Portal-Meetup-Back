import bcrypt from 'bcrypt';

import getPool from '../../database/getPool.js';

// Importamos los servicios.
import sendMailUtil from '../../utils/sendMailUtil.js';

// Importamos los errores.
import {
    emailAlreadyRegisteredError,
    sendEmailError,
    userAlreadyRegisteredError,
} from '../../services/errorService.js';

import { URL_FRONT } from '../../../env.js';

// Realizamos una consulta a la BBDD para crear un nuevo usuario.
const insertUserModel = async (
    username,
    email,
    password,
    registrationCode,
    firstName,
    lastname
) => {
    const pool = await getPool();
    console.log(registrationCode);

    // Buscamos en la BBDD usuarios con ese nombre.
    let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
        username,
    ]);

    // Si existe usuario con ese nombre --> error.
    if (users.length > 0) {
        throw emailAlreadyRegisteredError();
    }

    // Buscamos en la BBDD algún usuario con ese email.
    [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

    // Si existe usuario con ese email --> error.
    if (users.length > 0) {
        throw userAlreadyRegisteredError();
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario.
    await pool.query(
        `INSERT INTO users(
            username,
            email,
            password,
            registrationCode,
            firstName,
            lastname ) VALUES( ?, ?, ?, ?, ?, ?)`,
        [username, email, hashedPass, registrationCode, firstName, lastname]
    );

    // Creamos el asunto del email de verificación.
    const emailSubject = '🌟 Active su usuario en OurMeetup 🌟';

    // Creamos el contenido del email
    const emailBody = `
            <p>¡Bienvenide, ${username}!</p>

            <p>💌 Le damos las gracias por registrarse en OurMeetup.</p>
            <p>➡️ Para activar su cuenta, haga click en el siguiente enlace:</p>

            <p><a href="${URL_FRONT}${registrationCode}">Activar mi cuenta</a></p>

            <p>Un saludo,</p>
            <p>El equipo de OurMeetup🫂</p>
        `;

    // Enviamos el email de verificación al usuario.
    try {
        await sendMailUtil(email, emailSubject, emailBody);
        console.log('Correo enviado exitosamente');
    } catch (err) {
        console.error('Error al enviar el correo:', err);
        throw sendEmailError();
    }
};

export default insertUserModel;

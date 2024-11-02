import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from '../../database/getPool.js';

// Importamos los servicios.
import sendMailUtil from '../../utils/sendMailUtil.js';

// Importamos los errores.
import {
    emailAlreadyRegisteredError,
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

    // Buscamos en la BBDD usuarios con ese nombre.
    let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
        username,
    ]);

    // Si existe usuario con ese nombre --> error.
    if (users.length > 0) {
        emailAlreadyRegisteredError();
    }

    // Buscamos en la BBDD algún usuario con ese email.
    [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

    // Si existe usuario con ese email --> error.
    if (users.length > 0) {
        userAlreadyRegisteredError();
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
    const emailSubject = 'Activa tu usuario en nuestra app de Meet Ups 🌟';

    // Creamos el contenido del email
    const emailBody = `
            ¡Bienvenide, ${username}!

            Gracias por registrarte en nuestra app de Meet Ups. Para activar tu cuenta, haz clic en el siguiente enlace:

            <a href="${URL_FRONT} / ${registrationCode}">Activar mi cuenta</a>
        `;

    // Crear en el .env una variable de entorno URL_FRONT.

    // Enviamos el email de verificación al usuario.
    await sendMailUtil(email, emailSubject, emailBody);
};

export default insertUserModel;

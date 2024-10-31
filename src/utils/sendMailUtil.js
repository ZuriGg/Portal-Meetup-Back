import nodemailer from 'nodemailer';

import { sendEmailError } from '../services/errorService.js';

import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '../../env.js';

// Creamos un transporte para poder enviar emails con nodemailer.
const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    /* secure: false, // Usar false para el puerto 587 (STARTTLS) */
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

// enviamos un mail a un usuario.
const sendMailUtil = async (email, subject, body) => {
    try {
        const mailOptions = {
            from: SMTP_USER,
            to: email,
            subject,
            html: body,
        };

        const algo = await transport.sendMail(mailOptions);
        console.log('ALGO>>>>>>>', algo);
    } catch (err) {
        console.error(err);
        sendEmailError();
    }
};

export default sendMailUtil;

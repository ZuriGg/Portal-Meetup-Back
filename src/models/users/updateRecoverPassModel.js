import getPool from '../../database/getPool.js';

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
    const emailSubject = 'Recuperación de contraseña en Meet Ups 🌟';

    // Creamos el contenido del email
    const emailBody = `
            Se ha solicitado la recuperación de contraseña para este email en Meet Ups. 
                
            Utiliza el siguiente código para crear una nueva contraseña: ${recoverPassCode}

            Si no has sido tú ignora este email.
        `;

    // Enviamos el email de verificación al usuario.
    await sendMailUtil(email, emailSubject, emailBody);
};

export default updateRecoverPassModel;

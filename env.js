import dotenv from 'dotenv';
dotenv.config();
// Importar las variables de entorno del .env
export const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB,
    MYSQL_PORT,
    PORT,
    SECRET,
    UPLOADS_DIR,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    URL_FRONT,
} = process.env;

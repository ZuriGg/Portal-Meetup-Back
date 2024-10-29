import mysql from 'mysql2/promise';

// Variables de entorno
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } from '../../env.js';

// Variable para el pool de conexiones.
let pool;

// Función que retorna un pool de conexiones
const getPool = async () => {
    try {
        // Si la variable "pool" es undefined...
        if (!pool) {
            // Creamos una pool temporal.
            const poolTemp = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });

            // Con el pool temporal creamos la base de datos si no existe.
            await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            // Creamos un grupo de conexiones.
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                // Zona horaria del servidor de MySQL
                timezone: 'local',
            });
        }
    
        return pool;
    } catch (err) {
        throw err;
    }
    
};

export default getPool;




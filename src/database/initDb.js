import getPool from './getPool.js';

const main = async () => {
    let pool;

    try {
        pool = await getPool();

        console.log('Eliminando base de datos...');

        await pool.query('DROP DATABASE IF EXISTS meetup');

        console.log('Creando base de datos meetup...');

        await pool.query('CREATE DATABASE meetup');

        console.log('Seleccionando base de datos...');

        await pool.query('USE meetup');

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS users, meetups, meetupPhotos, meetupVotes, location'
        );

        console.log('Creando tablas...');

        // Tabla de usuarios --> información de los usuarios registrados en el sistema
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                meetupOwner VARCHAR(100), /* si es organizador de algún meetup */
                avatar VARCHAR(100), /* Ruta o URL del avatar del usuario */
                active BOOLEAN DEFAULT false, /* Estado del usuario, 'false' por defecto. Los admin activan a los organizadores para subir eventos */
                role ENUM('organizador', 'normal', 'admin') DEFAULT 'normal', /* crear evento desde normal u organizador, pero los admin confirman que esos usuarios son válidos  */
                registrationCode CHAR(30), /* Código de registro para activación */
                recoverPassCode CHAR(10), /* Código para recuperar contraseña */
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);

        // Creamos la tabla de location --> guarda la información de ubicaciones para los eventos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS location (
                id CHAR(36) PRIMARY KEY NOT NULL,
                city VARCHAR(50) NOT NULL,
                address VARCHAR(100),
                notes VARCHAR(100) NOT NULL, /* lugar en concreto, ej: sala de usos múltiples */
                zip CHAR(5) NOT NULL, /* CHAR ocupa menos espacio */
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP 
            )
        `);

        // Tabla de category --> almacena las diferentes categorías de los eventos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS category (
                id CHAR(36) PRIMARY KEY NOT NULL,
                name VARCHAR(50) NOT NULL
            )
        `);

        // Tabla de fotos --> almacena las fotos asociadas a los eventos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS meetupPhotos (
                id CHAR(36) PRIMARY KEY NOT NULL,
                url VARCHAR(100) NOT NULL,
                meetupId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (meetupId) REFERENCES meetups(id)
            )
        `);

        // Tabla de meetups --> registra los eventos creados por los usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS meetups (
                id CHAR(36) PRIMARY KEY NOT NULL,
                title VARCHAR(50) NOT NULL,
                description TEXT NOT NULL, 
                startDate DATE NOT NULL, /* fecha de inicio */
                oneSession BOOLEAN DEFAULT FALSE, /* ej. determinar si es una única sesión, como el martes 29*/
                hourMeetup TIME,
                dayOfTheWeek ENUM ('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'), /* NO PONER NOT NULL por si no es un día en concreto*/
                aforoMax TINYINT UNSIGNED,
                userId CHAR(36) NOT NULL, /* usuario relacionado (puede ser asistente o co-organizador) */
                owner CHAR(36) NOT NULL,
                locationId CHAR(36) NOT NULL,
                categoryId CHAR(36) NOT NULL,
                photoId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (categoryId) REFERENCES category(id),
                FOREIGN KEY (locationId) REFERENCES location(id),
                FOREIGN KEY (photoId) REFERENCES meetupPhotos(id)
            )
        `);

        // Tabla de attendance --> registra la asistencia de los usuarios a los eventos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS attendance (
                id CHAR(36) PRIMARY KEY NOT NULL,
                date DATETIME NOT NULL,
                userId CHAR(36) NOT NULL,
                meetupId CHAR(36) NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (meetupId) REFERENCES meetups(id)
            )
        `);

        // Tabla de outOfService --> registra la cancelación o inhabilitación de eventos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS outOfService (
                id CHAR(36) PRIMARY KEY NOT NULL,
                notes VARCHAR(100) NOT NULL, /* motivo por el que se cancela: aforoMax, huelga de basura */
                date DATETIME NOT NULL,
                meetupId CHAR(36) NOT NULL,
                FOREIGN KEY (meetupId) REFERENCES meetups(id)
            )
        `);

        // Tabla de votos --> permite que los usuarios califiquen los eventos según asistencia (sesión)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS meetupVotes (
                id CHAR(36) PRIMARY KEY NOT NULL,
                value TINYINT UNSIGNED NOT NULL CHECK (value BETWEEN 1 AND 5), 
                coment TEXT NOT NULL,
                userId CHAR(36) NOT NULL,
                attendanceId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (attendanceId) REFERENCES attendance(id)
            )
        `);

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        // Cerramos el proceso.
        process.exit();
    }
};

main();

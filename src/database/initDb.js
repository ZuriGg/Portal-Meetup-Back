import getPool from './getPool.js';

const main = async () => {
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS users, meetups, meetupPhotos, meetupVotes, location'
        );

        console.log('Creando tablas...');

        // Tabla de usuarios --> comentario en cada tabla indicando lo que hace
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false, /* en caso de usuario organizador, el admin le da el activo para subir eventos (q le llegue correo al usuario admin)*/
                role ENUM('organizador', 'normal', 'admin') DEFAULT 'normal', /* crear evento desde normal u organizador, pero los admin confirman que esos usuarios son válidos  */
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);

        // Creamos la tabla de location.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS location (
                id CHAR(36) PRIMARY KEY NOT NULL,
                city VARCHAR(50) NOT NULL,
                address VARCHAR(100),
                notes VARCHAR(100) NOT NULL,
                pc CHAR(5) UNSIGNED NOT NULL, /* CHAR ocupa menos espacio */
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP 
            )
        `);

        // Tabla de meetups.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS meetups (
                id CHAR(36) PRIMARY KEY NOT NULL,
                title VARCHAR(50) NOT NULL,
                description TEXT NOT NULL, 
                DATE NOT NULL, /* fecha de inicio */
                oneSession BOOLEAN DEFAULT FALSE, /* ej. determinar si es una única sesión, como el martes 29*/
                hourMeetup TIME,
                dayOfTheWeek ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo') /* NO PONER NOT NULL por si no es un día en concreto*/
                aforoMax TINYINT UNSIGNED INT,
                userId CHAR(36) NOT NULL,
                locationId CHAR(36) NOT NULL,
                categoryId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (categoryId) REFERENCES category(id)
                FOREIGN KEY (locationId) REFERENCES location(id)
            )
        `);

        // Tabla de category.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS category (
                id CHAR(36) PRIMARY KEY NOT NULL,
                name VARCHAR(50) NOT NULL,
            )
        `);

        // Tabla de attendance.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS attendance (
                id CHAR(36) PRIMARY KEY NOT NULL,
                date DATETIME NOT NULL CHECK (date >= CURRENT_TIMESTAMP),
                userId CHAR(36) NOT NULL,
                meetupId CHAR(36) NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (meetupId) REFERENCES meetups(id)
            )
        `);

        // Tabla de outOfService --> comentario en cada tabla indicando lo que hace
        await pool.query(`
            CREATE TABLE IF NOT EXISTS outOfService (
                id CHAR(36) PRIMARY KEY NOT NULL,
                notes VARCHAR(100) NOT NULL, /* motivo por el que se cancela: aforoMax, huelga de basura */
                date DATETIME NOT NULL CHECK (date >= CURRENT_TIMESTAMP),
                meetupId CHAR(36) NOT NULL,
                FOREIGN KEY (meetupId) REFERENCES meetups(id)
            )
        `);

        // Tabla de fotos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS meetupPhotos (
                id CHAR(36) PRIMARY KEY NOT NULL,
                name VARCHAR(100) NOT NULL,
                meetupId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (meetupId) REFERENCES meetups(id)
            )
        `);

        // Tabla de votos.
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

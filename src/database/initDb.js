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
            'DROP TABLE IF EXISTS users, meetups, meetupPhotos, meetupVotes, location, category, attendance, outOfService'
        );

        console.log('Creando tablas...');

        // Tabla de usuarios --> información de los usuarios registrados en el sistema
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                firstName VARCHAR(30) NOT NULL,
                lastname VARCHAR(30) NOT NULL,
                password VARCHAR(100) NOT NULL,
                meetupOwner VARCHAR(100),
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                role ENUM('organizador', 'normal', 'admin') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Tabla de location --> guarda la información de ubicaciones para los eventos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS location (
                id INT AUTO_INCREMENT PRIMARY KEY,
                city VARCHAR(50) NOT NULL,
                address VARCHAR(100),
                notes VARCHAR(100) NOT NULL,
                zip CHAR(5) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP 
            )
        `);

        // Tabla de category --> almacena las diferentes categorías de los eventos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS category (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL
            )
        `);

        await pool.query(`
                INSERT INTO category(name) VALUES("Viajes y aire libre")
            `);
        await pool.query(`
                INSERT INTO category(name) VALUES("Actividades sociales")
            `);
        await pool.query(`
                INSERT INTO category(name) VALUES("Aficiones y pasiones")
            `);
        await pool.query(`
                INSERT INTO category(name) VALUES("Deportes y fitness")
            `);
        await pool.query(`
                INSERT INTO category(name) VALUES("Salud y bienestar")
            `);
        await pool.query(`
                INSERT INTO category(name) VALUES("Tecnología")
            `);
        await pool.query(`
                INSERT INTO category(name) VALUES("Arte y cultura")
            `);
        await pool.query(`
                INSERT INTO category(name) VALUES("Juegos")
            `);

        // Tabla de meetups --> registra los eventos creados por los usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS meetups (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(50) NOT NULL,
                description TEXT NOT NULL, 
                startDate DATE NOT NULL,
                oneSession BOOLEAN DEFAULT FALSE,
                hourMeetup TIME,
                dayOfTheWeek ENUM ('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'),
                aforoMax TINYINT UNSIGNED,
                userId INT NOT NULL, 
                locationId INT NOT NULL,
                categoryId INT NOT NULL,
                validated BOOLEAN DEFAULT false,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (categoryId) REFERENCES category(id),
                FOREIGN KEY (locationId) REFERENCES location(id)
            )
        `);

        // Tabla de meetupPhotos --> almacena las fotos asociadas a los eventos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS meetupPhotos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                url VARCHAR(100) NOT NULL,
                meetupId INT NOT NULL,
                FOREIGN KEY (meetupId) REFERENCES meetups(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de attendance --> registra la asistencia de los usuarios a los eventos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS attendance (
                id INT AUTO_INCREMENT PRIMARY KEY,
                date DATETIME NOT NULL,
                userId INT NOT NULL,
                meetupId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (meetupId) REFERENCES meetups(id)
            )
        `);

        // Tabla de outOfService --> registra la cancelación o inhabilitación de eventos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS outOfService (
                id INT AUTO_INCREMENT PRIMARY KEY,
                notes VARCHAR(100) DEFAULT 'Día inhabilitado: ',
                date DATETIME NOT NULL,
                meetupId INT NOT NULL,
                FOREIGN KEY (meetupId) REFERENCES meetups(id)
            )
        `);

        // Tabla de meetupVotes --> permite que los usuarios califiquen los eventos según asistencia (sesión)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS meetupVotes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                value TINYINT UNSIGNED NOT NULL CHECK (value BETWEEN 1 AND 5), 
                coment TEXT NOT NULL,
                userId INT NOT NULL,
                attendanceId INT NOT NULL,
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

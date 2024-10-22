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

        // Tabla de usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'invitado', 'registrado') DEFAULT 'invitado',
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
                building VARCHAR(50) NOT NULL,
                address VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP 
            )
        `);

        // Tabla de meetups.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS meetups (
                id CHAR(36) PRIMARY KEY NOT NULL,
                title VARCHAR(50) NOT NULL,
                description TEXT NOT NULL,
                category ENUM('música', 'ocio nocturno', 'citas', 'negocios', 'cocina', 'aficiones', 'vacaciones') DEFAULT 'citas',
                date DATETIME NOT NULL CHECK (date >= CURRENT_TIMESTAMP),
                userId CHAR(36) NOT NULL,
                locationId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (locationId) REFERENCES location(id)
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
                meetupId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (meetupId) REFERENCES meetups(id)
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

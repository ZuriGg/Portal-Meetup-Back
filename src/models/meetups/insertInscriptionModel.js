import getPool from '../../database/getPool.js';

// Realizamos una consulta a la BBDD para votar un meetup.
const insertInscriptionModel = async (user, meetupId, date) => {
    const pool = await getPool();

    console.log(`La id del meetup es: ${meetupId}`);
    console.log(`La id del usuario es: ${user}`);
    console.log(`La mierda de date es: ${date}`);

    // Insertamos el voto.
    await pool.query(
        `INSERT INTO attendance(date, meetupId, userId) VALUES(?, ?, ?)`,
        [date, meetupId, user]
    );
};

export default insertInscriptionModel;

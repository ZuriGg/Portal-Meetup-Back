import getPool from '../../database/getPool.js';

// Consulta a la BBDD para validar un meetup.
const insertInscriptionModel = async (meetupId, validated) => {
    const pool = await getPool();
    let isValidated;

    switch (validated) {
        case true:
            isValidated = 1;
            break;
        case false:
            isValidated = 0;
            break;

        default:
            break;
    }

    console.log(
        `La id del meetup en el model es: ${meetupId} y la validación es ${validated}, el estado de validacion es: ${isValidated}`
    );

    // Inserción de la validación del meetup.
    const [result] = await pool.query(
        `UPDATE meetups SET validated = ? WHERE id = ?`,
        [isValidated, meetupId]
    );

    console.log(`Filas afectadas: ${result.affectedRows}`);
};

export default insertInscriptionModel;

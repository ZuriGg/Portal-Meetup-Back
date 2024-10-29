import getPool from '../../database/getPool.js';

// Realizamos una consulta a la BBDD para obtener el listado de meetups.
const selectAllMeetupsModel = async (keyword = '', userId = '') => {
    const pool = await getPool();

    // Obtenemos el listado de entradas.
    const [meetups] = await pool.query(
        `
            SELECT 
                M.id,
                M.title,
                U.username,
                BIT_OR(V.userId = ?) AS votedByMe, 
                M.userId = ? AS owner,
                AVG(IFNULL(V.value, 0)) AS votes,
                M.createdAt
            FROM meetups M
            LEFT JOIN meetupVotes V ON V.meetupId = M.id
            INNER JOIN users U ON U.id = M.userId
            WHERE M.title LIKE ? OR M.description LIKE ?
            GROUP BY M.id
            ORDER BY M.createdAt DESC
        `,
        [userId, userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );

    // Recorremos el array de meetups para agregar a cada meetup la primera foto (si hay).
    for (const meetup of meetups) {
        // Buscamos las fotos de la entrada.
        const [photos] = await pool.query(
            `SELECT id, name FROM meetupVotes WHERE meetupId = ?`,
            [meetup.id]
        );

        // Agregamos las fotos a la entrada. Si no existe foto en la posición cero establecemos un valor null.
        meetup.photos = photos.length > 0 ? photos[0] : null;

        // Establecemos como valores booleanos "votedByMe" y "owner"
        meetup.votedByMe = Boolean(meetup.votedByMe);
        meetup.owner = Boolean(meetup.owner);

        // La media de votos es un valor de tipo String. Podemos convertirla a Number.
        meetup.votes = Number(meetup.votes);
    }

    // Retornamos las entradas.
    return meetups;
};

export default selectAllMeetupsModel;

/* selectAllMeetupsModel.js es una función que consulta la base de datos para obtener un listado de meetups con información detallada. */

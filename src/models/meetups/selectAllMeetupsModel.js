import getPool from '../../database/getPool.js';

//se toma como argumento el objeto req.query del controlador
const selectAllMeetupsModel = async (keyword = {}) => {
    const pool = await getPool();

    const {
        location,
        minVotes,
        category,
        search,
        order = 'createdAt',
        page = 1,
        limit = 20,
    } = keyword;

    const conditions = [];
    const values = [];

    //insercion de valores
    //location que fue lo que puso el usuario mediante req.query
    //por eso es una incersion y evita inyeccion SQL
    if (location) {
        conditions.push('l.city LIKE ?');
        values.push(`%${location}%`);
    }

    if (minVotes) {
        conditions.push('AVG(IFNULL(v,value, 0))>=?');
        values.push(minVotes);
    }

    if (category) {
        conditions.push('m.categoryId = ?');
        values.push(category);
    }

    //condicion para capturar lo que esta escribiendo el usuario referido a los parametros title y description
    if (search) {
        conditions.push('(m.title LIKE ? OR m.description LIKE ?)');
        values.push(`%${search}%`, `%${search}%`);
    }

    //se calcula el offset para saber el limite que se muestra de meetups y cuantos se dejan fuera
    const offset = (page - 1) * limit;

    //consulta parametrizada con limit y offset
    const query = `
       SELECT m.id, m.title, m.description, m.startDate, m.oneSession, m.hourMeetup, m.dayOfTheWeek,
        m.aforoMax, m.userId, m.locationId, m.categoryId, m.validated,
        AVG(IFNULL(v.value, 0)) AS votes, m.createdAt
        FROM meetups m
        LEFT JOIN meetupVotes v ON v.id = m.id
        INNER JOIN users u ON u.id = m.userId
        INNER JOIN location l ON m.locationId = l.id
        ${category ? 'INNER JOIN category c ON m.categoryId = c.id' : ''}
        ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
        GROUP BY m.id
        ORDER BY ${order === 'votes' ? 'votes DESC' : 'm.createdAt DESC'}
        LIMIT ? OFFSET ?
    `;

    console.log();

    values.push(Number(limit), Number(offset));

    //devuelve un array de objetos (meetup)
    const [meetups] = await pool.query(query, values);

    for (let meetup of meetups) {
        /* const [photos] = await pool.query(
            `
                SELECT id, name FROM meetup_photos WHERE meetupId=?
            `,
            [meetup.id]
        ); */
        // Agregamos las fotos a la entrada. Si no existe foto en la posición cero establecemos un valor null.
        /* meetup.photos = photos.length > 0 ? photos[0] : null; */
    }
    return meetups;
};

export default selectAllMeetupsModel;

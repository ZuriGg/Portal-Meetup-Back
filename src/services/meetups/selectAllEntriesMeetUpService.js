import getPool from '../../database/getPool.js';

//se toma como argumento el objeto req.query del controlador
const selectAllEntriesMeetUpService = async (searchs = {}) => {
    const pool = getPool();
    const {
        location,
        minVotes,
        category,
        search,
        order = 'createdAt',
        page = 1,
        limit = 20,
    } = searchs;

    const conditions = [];
    const values = [];

    //insercion de valores
    //location que fue lo que puso el usuario mediante req.query
    //por eso es una incersion y evita inyeccion SQL
    if (location) {
        conditions.push('m.idLocation = ?');
        values.push(location);
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
       SELECT m.meetupid, m.title, m.description, m.startDate, m.hourMeetup, m.dayOfTheWeek,
        m.aforoMax, m.userId, m.owner, m.locationId, m.categoryId,
        AVG(IFNULL(v.value, 0)) AS votes, m.createdAt
        FROM meetups m
        LEFT JOIN meetup_votes v ON v.meetupid = m.id
        INNER JOIN users u ON u.id = m.userId
        ${category ? 'INNER JOIN category c ON m.categoryId = c.id' : ''}
        ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
        GROUP BY m.id
        ORDER BY ${order === 'votes' ? 'votes DESC' : 'm.createdAt DESC'}
        LIMIT ? OFFSET ?
    `;

    values.push(limit, offset);

    //devuelve un array de objetos (meetup)
    const [meetups] = await pool.query(query, values);

    for (let meetup of meetups) {
        const [photos] = await pool.query(
            `
                SELECT id, name FROM meetup_photos WHERE meetupId=?
            `,
            [meetup.id]
        );

        meetup.photos = photos;
    }
    return meetups;
};

export default selectAllEntriesMeetUpService;

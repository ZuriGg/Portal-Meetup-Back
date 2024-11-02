import getPool from '../database/getPool.js';

const meetupExists = async (req, res, next) => {
    try {
        const { meetupId } = req.params;
        console.log(meetupId);
        
        const pool = await getPool();

        const [entry] = await pool.query(
            'SELECT id FROM meetups WHERE id = ?',
            [meetupId]
        );

        if (entry.length === 0) {
            return res
                .status(404)
                .json({ message: 'La entrada solicitada no existe' });
        }

        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export default meetupExists;

// src/middlewares/entryExists.js
import getPool from '../database/getPool.js';

const entryExists = async (req, res, next) => {
    try {
        const { entryId } = req.params;
        const pool = await getPool();

        const [entry] = await pool.query(
            'SELECT id FROM meetups WHERE id = ?',
            [entryId]
        );

        if (entry.length === 0) {
            return res.status(404).json({ message: 'La entrada solicitada no existe' });
        }

        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export default entryExists;

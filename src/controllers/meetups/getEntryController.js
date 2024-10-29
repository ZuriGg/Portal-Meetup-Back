// src/controllers/getEntryController.js
import getPool from '../database/getPool.js';

const getEntryController = async (req, res, next) => {
    try {
        const { entryId } = req.params;
        console.log(entryId);
        const pool = await getPool();

        const [entry] = await pool.query(
            'SELECT * FROM meetups WHERE id = ?',
            [entryId]
        );

        if (entry.length === 0) {
            return res.status(404).json({ message: 'Entrada no encontrada' });
        }

        res.status(200).json(entry[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export default getEntryController;

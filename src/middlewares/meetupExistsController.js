import getPool from '../database/getPool.js';

import { notFoundError } from '../services/errorService.js';

const meetupExistsController = async (req, res, next) => {
    try {
        const pool = await getPool();

        // Obtenemos id del meetup de los path params.
        const { meetupId } = req.params;

        const [meetups] = await pool.query(
            `SELECT id FROM meetups WHERE id = ?`,
            [meetupId]
        );

        // Error si meetup NO existe.
        if (meetups.length < 1) {
            return next(notFoundError('meetup'));
        }

        next();
    } catch (err) {
        next(err);
    }
};

export default meetupExistsController;

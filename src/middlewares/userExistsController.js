import getPool from '../database/getPool.js';

import { notFoundError } from '../services/errorService.js';

//error si no existe un usuario con un id dado.
const userExistsController = async (req, res, next) => {
    try {
        const pool = await getPool();

        // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad
        // no existe, obtenemos el id de los path params.
        const userId = req.user?.id || req.params.userId;

        const [users] = await pool.query(`SELECT id FROM users WHERE id = ?`, [userId]);

        // Lanzamos un error si el usuario no existe.
        if (users.length < 1) {
            return next(notFoundError('usuario'));
        }

        //si existe usuario, se pasa al siguiente middleware
        next();
    } catch (err) {
        next(err);
    }
};

export default userExistsController;

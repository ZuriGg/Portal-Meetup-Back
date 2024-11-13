import getPool from '../../database/getPool.js';
import { notFoundError } from '../../services/errorService.js';

const selectLocationByIdModel = async (locationId) => {
    const pool = await getPool();

    //obtenemos la información referente a la localización
    const [location] = await pool.query('SELECT * FROM location WHERE id = ?', [
        locationId,
    ]);

    //Verificamos que la locaclización exista
    if (location.length === 0) {
        return notFoundError();
    }

    return {
        ...location[0], //retornamos el primer objeto
    };
};

export default selectLocationByIdModel;

/*s electLocationByIdModel --> obtiene información detallada de una localización específica a partir de su ID */

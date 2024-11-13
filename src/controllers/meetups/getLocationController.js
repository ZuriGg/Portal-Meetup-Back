import selectLocationByIdModel from '../../models/meetups/selectLocationByIdModel.js';
import { notFoundError } from '../../services/errorService.js';

const getLocationController = async (req, res, next) => {
    try {
        const { locationId } = req.params;
        const location = await selectLocationByIdModel(locationId);

        //verifica si encontró esa localización
        if (!location) {
            throw notFoundError();
        }

        res.send({
            status: 'ok',
            data: location,
        });
    } catch (error) {
        next(error);
    }
};

export default getLocationController;

//se trata de un controlador para seleccionar una localización según su id

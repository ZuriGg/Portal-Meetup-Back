import selectMeetupByIdModel from '../../models/meetups/selectMeetupByIdModel.js';
import { notFoundError } from '../../services/errorService.js';

const getMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;

        const meetUp = await selectMeetupByIdModel(meetupId);

        // Verifica si el meetup fue encontrado
        if (!meetUp) {
            throw notFoundError();
        }

        res.send({
            status: 'ok',
            data: meetUp,
        });
    } catch (error) {
        next(error);
    }
};

export default getMeetupController;

//se trata de un controlador para seleccionar un meet up según su id

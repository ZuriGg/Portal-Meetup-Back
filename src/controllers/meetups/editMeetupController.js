import editMeetupModel from '../../models/meetups/editMeetupModel.js';

//para validar el body con el esquema proporcionado
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema concreto
import editMeetupSchema from '../../schemas/meetups/editMeetupSchema.js';

const editMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;

        const {
            title,
            description,
            startDate,
            oneSession,
            categoryId,
            locationId,
            city,
            address,
            notes,
            zip,
            userId,
            hourMeetUp,
            dayOfTheWeek,
            aforoMax,
        } = req.body;

        // aplicamos la validacion con joi antes de seguir con el controlador
        await validateSchemaUtil(editMeetupSchema, req.body);

        await editMeetupModel(
            title,
            description,
            startDate,
            oneSession,
            categoryId,
            locationId,
            city,
            address,
            notes,
            zip,
            userId,
            hourMeetUp,
            dayOfTheWeek,
            aforoMax,
            meetupId
        );

        res.send({
            status: 'ok',
            message: 'Entrada actualizada',
        });
    } catch (error) {
        next(error);
    }
};

export default editMeetupController;

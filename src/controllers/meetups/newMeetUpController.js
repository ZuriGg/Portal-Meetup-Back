import insertMeetupModel from '../../models/meetups/insertMeetupModel.js';

//para validar el body con el esquema proporcionado
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema concreto
import newMeetupSchema from '../../schemas/meetups/newMeetupSchema.js';

const newMeetupController = async (req, res, next) => {
    try {
        const {
            title,
            description,
            startDate,
            oneSession,
            categoryId,
            city,
            address,
            zip,
            hourMeetup,
            dayOfTheWeek,
            aforoMax,
            userId,
        } = req.body;

        // aplicamos la validacion con joi antes de seguir con el model
        await validateSchemaUtil(newMeetupSchema, req.body);

        const newMeetupId = await insertMeetupModel(
            title,
            description,
            startDate,
            oneSession,
            categoryId,
            city,
            address,
            zip,
            hourMeetup,
            dayOfTheWeek,
            aforoMax,
            userId
        );

        res.send({
            status: 'ok',
            data: 'Meetup creado satisfactoriamente',
            newMeetupId,
        });
    } catch (error) {
        next(error);
    }
};

export default newMeetupController;

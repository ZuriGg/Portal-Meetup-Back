import invalidDayMeetupModel from '../../models/meetups/invalidDayMeetupModel.js';

//para validar el body con el esquema proporcionado
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema concreto
import invalidDayMeetupSchema from '../../schemas/meetups/invalidDayMeetupSchema.js';

const invalidDayMeetupController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;
        const { date } = req.body;
        const { notes } = req.body;

        // aplicamos la validacion con joi antes de seguir con el controlador
        await validateSchemaUtil(invalidDayMeetupSchema, req.body);

        if (!date) {
            throw new Error(
                'La fecha es obligatoria para inhabilitar el día del meetup.'
            );
        }

        const resultId = await invalidDayMeetupModel(meetupId, date, notes);

        res.send({
            status: 'ok',
            message: 'Día del meetup inhabilitado correctamente',
            data: {
                meetupId,
                date,
                notes,
                recordId: resultId,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default invalidDayMeetupController;

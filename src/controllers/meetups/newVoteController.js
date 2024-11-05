import newVoteModel from "../../models/meetups/newVoteModel";

const newVoteController = async (req, res, next) => {
    try {
        const { attendanceId } = req.params; //id de la sesión al meetup
        const { userId } = req.user; // userId autenticado
        const { value, coment } = req.body; //puntuación y comentario

        await newVoteModel(value, coment);

        res.send({
            status: 'ok',
            message: `La sesión con id ${attendanceId} del meetup ${} ha sido calificada con un valor de ${value} sobre un total de 5 puntos`,
        });
    } catch (error) {
        next(error);
    }
};

export default newVoteController;

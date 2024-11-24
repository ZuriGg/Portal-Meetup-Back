import selectAllVotesFromMeetupModel from '../../models/meetups/selectAllVotesFromMeetupModel.js';

const getListVotesController = async (req, res, next) => {
    try {
        //seleccionamos todos los votos de la tabla meetup
        const votesData = await selectAllVotesFromMeetupModel();

        if (votesData.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay votos registrados para este meetup.',
            });
        }

        res.send({
            status: 'ok',
            data: votesData,
        });
    } catch (error) {
        next(error);
    }
};

export default getListVotesController;

//import selectVotesByUserIdModel from '../../models/meetups/selectVotesByUserIdModel.js';

const getUserVotesController = async (req, res, next) => {
    try {
        const userId = req.user.id; // Obtenemos el ID del usuario autenticado

        // Obtenemos las valoraciones hechas por el usuario
        const votes = await selectVotesByUserIdModel(userId);

        res.send({
            status: 'ok',
            votes,
        });
    } catch (error) {
        next(error);
    }
};

export default getUserVotesController;

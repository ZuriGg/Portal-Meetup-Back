import selectAllUsersModel from '../../models/users/selectAllUsersModel.js';

const listUsersController = async (req, res, next) => {
    try {
        const usersData = await selectAllUsersModel();

        if (usersData.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay usuarios registrados xD.',
            });
        }

        res.send({
            status: 'ok',
            data: usersData,
        });
    } catch (error) {
        next(error);
    }
};

export default listUsersController;

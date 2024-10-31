import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import editUserModel from '../../models/users/editUserModel.js';
import { notFoundError } from '../../services/errorService.js';

const editUserController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const { firstName, lastName, email, username, password, avatar } =
            req.body;

        const { id } = selectUserByIdModel(userId);

        if (userId != id) throw notFoundError('userId');

        await editUserModel(
            firstName,
            lastName,
            email,
            username,
            password,
            avatar,
            userId
        );
    } catch (error) {}
};

export default editUserController;

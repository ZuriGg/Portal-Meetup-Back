import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import editUserModel from '../../models/users/editUserModel.js';
import { notFoundError } from '../../services/errorService.js';

const editUserController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        console.log(userId);

        const { firstName, lastname, email, username, password, avatar } =
            req.body;

        const { id } = await selectUserByIdModel(userId);

        if (userId != id) throw notFoundError('userId');

        await editUserModel(
            firstName,
            lastname,
            email,
            username,
            password,
            avatar,
            userId
        );

        res.send({
            message: 'Ok, usuario editado',
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;

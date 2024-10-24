import express from 'express';

import registerUserController from '../controllers/users/registerUserController.js';
import loginUserController from '../controllers/users/loginUserController.js';
import validateUserController from '../controllers/users/validateUserController.js';
import getOwnUserController from '../controllers/users/getOwnUserController.js';
import editUserAvatarController from '../controllers/users/editUserAvatarController.js';
import editUserController from '../controllers/users/editUserController.js';
import sendRecoverPassController from '../controllers/users/sendRecoverPassController.js';
import editUserPasswordController from '../controllers/users/editUserPasswordController.js';

import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

//rutas de usarios (endpoint)
userRouter.post('/users/register', registerUserController)
userRouter.get('/users/validate/:registrationCode', validateUserController);

userRouter.post('/users/login', loginUserController);

//obtener el perfil privado del usuario
userRouter.get('/users', authUser,getOwnUserController);

userRouter.put('/users/edit/:userId', authUser, editUserController);
userRouter.put('/users/avatar', authUser, editUserAvatarController);


userRouter.post('/users/password/recover', sendRecoverPassController);
userRouter.put('/users/password', editUserPasswordController);

export default userRouter;
import express from 'express';

// Importamos las funciones controladoras intermedias.
import { authUser, userExistsController } from '../middlewares/index.js';

// Importamos las funciones controladoras finales.
import {
    newUserController,
    loginUserController,
    getUserProfileController,
    getOwnUserController,
    editUserAvatarController,
    editUserPassController,
    validateUserController,
    sendRecoverPassController,
} from '../controllers/users/index.js';

const userRouter = express.Router();

//rutas de usarios (endpoint)
userRouter.post('/users/register', newUserController);
userRouter.get('/users/validate/:registrationCode', validateUserController);

userRouter.post('/users/login', loginUserController);

// Obtener perfil privado de un usuario.
userRouter.get('/users', authUser, userExistsController, getOwnUserController);

userRouter.put('/users/edit/:userId', authUser, editUserController);

// Obtener perfil público de un usuario.
userRouter.get(
    '/users/:userId',
    userExistsController,
    getUserProfileController
);

userRouter.put(
    '/users/avatar',
    authUser,
    userExistsController,
    editUserAvatarController
);

// email de recuperación de contraseña.
userRouter.post('/users/password/recover', sendRecoverPassController);

// Editar la contraseña de un usuario con un código de recuperación.
userRouter.put('/users/password', editUserPassController);

export default userRouter;

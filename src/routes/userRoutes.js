import express from 'express';

// Importamos las funciones controladoras intermedias.
import { authUser, userExistsController } from '../middlewares/index.js';

// Importamos las funciones controladoras finales.
import {
    newUserController,
    loginUserController,
    editUserAvatarController,
    editUserPassController,
    validateUserController,
    sendRecoverPassController,
    editUserController,
    getUserProfileController,
    getUserVotesController,
    listUsersController,
} from '../controllers/users/index.js';

const userRouter = express.Router();

//rutas de usarios (endpoint)
userRouter.post('/users/register', newUserController);
userRouter.get('/users/validate/:registrationCode', validateUserController);

userRouter.post('/users/login', loginUserController);

//obtener todos los perfiles de usuarios (públicos)
userRouter.get('/users', listUsersController);

//editar usuario
userRouter.put('/users/edit/:userId', authUser, editUserController);

//obtener perfil privado de un usuario cuando se loguea.
userRouter.get(
    '/users/:userId',
    authUser,
    userExistsController,
    getUserProfileController
);

//editar avatar
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

// Ruta para obtener todas las valoraciones de un usuario //EN CONSTRUCCIÓN
userRouter.get('/users/votes', authUser, getUserVotesController);

export default userRouter;

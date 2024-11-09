import express from 'express';

// Importamos las funciones controladoras intermedias.
import { authUser, userExistsController } from '../middlewares/index.js';

// Importamos las funciones controladoras finales.
import {
    newUserController,
    loginUserController,
    getOwnUserController,
    editUserAvatarController,
    editUserPassController,
    validateUserController,
    sendRecoverPassController,
    editUserController,
    getUserProfileController,
} from '../controllers/users/index.js';

const userRouter = express.Router();

//rutas de usarios (endpoint)
userRouter.post('/users/register', newUserController);
userRouter.get('/users/validate/:registrationCode', validateUserController);

userRouter.post('/users/login', loginUserController);

// Obtener perfil privado de un usuario. (Entregar los datos del usuario segun su token, para el panel de usuario)
userRouter.get('/users', authUser, userExistsController, getOwnUserController);

//editar usuario
userRouter.put('/users/edit/:userId', authUser, editUserController);

// Obtener perfil público de un usuario. (Para poder mostrar datos de usuarios (En el detalles meetup) seleccionados por su id)
userRouter.get(
    '/users/:userId',
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
userRouter.post(
    '/users/password/recover',
    authUser,
    userExistsController,
    sendRecoverPassController
);

// Editar la contraseña de un usuario con un código de recuperación.
userRouter.put(
    '/users/password',
    authUser,
    userExistsController,
    editUserPassController
);

export default userRouter;

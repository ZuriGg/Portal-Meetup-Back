import express from 'express';

import {
    canEditController,
    meetupExists,
    authUser,
    canValidate,
} from '../middlewares/index.js';

import {
    cancelMeetUpRegistrationController,
    deleteMeetupController,
    deletePhotoController,
    editMeetupController,
    listMeetUpController,
    meetUpCategoryController,
    newMeetupController,
    inscriptionDateMeetupController,
    getMeetupController,
    validateMeetupController,
    newVoteController,
    invalidDayMeetupController,
} from '../controllers/meetups/index.js';

const meetUpRouter = express.Router();

//crea una nueva entrada
meetUpRouter.post('/meetups', authUser, newMeetupController);

//muestra todas las entradaas
meetUpRouter.get('/meetups', listMeetUpController);

//muestra una entrada en concreta
meetUpRouter.get('/meetups/:meetupId', meetupExists, getMeetupController);

// Endpoint que muestra la categoría
meetUpRouter.get('/categories', meetUpCategoryController);

//edita un meetup
meetUpRouter.put(
    '/meetups/edit/:meetupId',
    authUser,
    meetupExists,
    canEditController,
    editMeetupController
);

//Inscripcion a un meetup
meetUpRouter.post(
    '/meetups/:meetupId/inscription',
    authUser,
    meetupExists,
    inscriptionDateMeetupController
);

//cancela inscripcion meetup
meetUpRouter.delete(
    '/meetups/:meetupId/registration',
    cancelMeetUpRegistrationController
);

//cancela fecha meetup establecida
meetUpRouter.put(
    '/meetups/:meetupId/:userId/outservice',
    authUser,
    invalidDayMeetupController
);

//borra una entrada
meetUpRouter.delete(
    '/meetups/:meetupId',
    authUser,
    meetupExists,
    canEditController,
    deleteMeetupController
);

meetUpRouter.delete(
    '/meetups/:meetupId/photos/:photoId',
    authUser,
    meetupExists,
    canEditController,
    deletePhotoController
);

// Endpoint de validación de meetup (Establecerlo como público, verificado por un admin)
meetUpRouter.put(
    '/meetups/:meetupId/validate',
    authUser,
    meetupExists,
    canEditController, // Middleware para saber si el usuario puede editar el meetup
    canValidate, // Middleware para saber si el usuario es administrador y puede validar el meetup (Establecerlo público)
    validateMeetupController
);

//endpoint de rating (1-5) y comentario de un meetup después de la fecha de realización
meetUpRouter.post(
    '/meetups/:meetupId/votes',
    authUser, // que el usuario esté autenticado
    meetupExists, // que el meetup existe
    newVoteController //logica para gestionar el nuevo voto
);

export default meetUpRouter;

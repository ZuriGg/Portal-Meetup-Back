import express from 'express';

import {
    canEditController,
    meetupExists,
    authUser,
} from '../middlewares/index.js';

import {
    cancelMeetUpRegistrationController,
    deleteMeetupController,
    deletePhotoController,
    editMeetupController,
    listMeetUpController,
    meetUpCategoryController,
    newMeetupController,
    inscriptionMeetupController,
    getMeetupController,
    invalidDayMeetupController,
} from '../controllers/meetups/index.js';

const meetUpRouter = express.Router();

//crea una nueva entrada
meetUpRouter.post('/meetupentries', /* authUser, */ newMeetupController);

//muestra todas las entradaas
meetUpRouter.get('/meetupentries', listMeetUpController);

//muestra una entrada en concreta ANGELLLLL
meetUpRouter.get('/meetupentries/:meetupId', meetupExists, getMeetupController);

meetUpRouter.get('/categories', meetUpCategoryController);

//edita una entrada
meetUpRouter.put(
    '/meetupentries/edit/:meetupId',
    authUser,
    meetupExists,
    canEditController,
    editMeetupController
);

//Inscripcion a un meetup
meetUpRouter.post(
    '/meetupentries/:meetupId/inscription',
    authUser,
    meetupExists,
    inscriptionMeetupController
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
    '/meetupentries/:meetupId',
    authUser,
    meetupExists,
    canEditController,
    deleteMeetupController
);

meetUpRouter.delete(
    '/meetupentries/:meetupId/photos/:photoId',
    authUser,
    meetupExists,
    canEditController,
    deletePhotoController
);

export default meetUpRouter;

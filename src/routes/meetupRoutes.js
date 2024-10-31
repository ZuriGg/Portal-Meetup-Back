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
    voteMeetupController,
    getMeetupController,
} from '../controllers/meetups/index.js';

const meetUpRouter = express.Router();

//crea una nueva entrada
meetUpRouter.post('/meetupentries', authUser, newMeetupController);

//muestra todas las entradaas
meetUpRouter.get('/meetupentries', listMeetUpController);

//muestra una entrada en concreta ANGELLLLL
meetUpRouter.get('/meetupentries/:meetupId', meetupExists, getMeetupController);

meetUpRouter.get('/categories', meetUpCategoryController);

//edita una entrada
meetUpRouter.put(
    '/meetupentries/:entryId/edit',
    authUser,
    meetupExists,
    canEditController,
    editMeetupController
);

//vota una entrada
meetUpRouter.post(
    '/meetupentries/:entryId/votes',
    authUser,
    meetupExists,
    voteMeetupController
);

//cancela inscripcion meetup
meetUpRouter.delete(
    '/meetups/:meetupId/registration',
    cancelMeetUpRegistrationController
);

//borra una entrada
meetUpRouter.delete(
    '/meetupentries/:entryId',
    authUser,
    meetupExists,
    canEditController,
    deleteMeetupController
);

meetUpRouter.delete(
    '/meetupentries/:entryId/photos/:photoId',
    authUser,
    meetupExists,
    canEditController,
    deletePhotoController
);

export default meetUpRouter;

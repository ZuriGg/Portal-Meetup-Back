import express from 'express';
import listMeetUppEntriesController from '../controllers/meetups/listMeetUppEntriesController.js';
import cancelMeetUpRegistrationContoller from '../controllers/meetups/cancelMeetUpRegistrationContoller.js';
import newMeetUpEntryController from '../controllers/meetups/newMeetUpController.js';
import meetUpCategoryController from '../controllers/meetups/meetUpCategoryController.js';
import authUser from '../middlewares/authUser.js';
import voteMeetupController from '../controllers/meetups/voteMeetupController.js';

const meetUpRouter = express.Router();

//crea una nueva entrada
meetUpRouter.post('/meetupentries', authUser, newMeetUpEntryController);

//muestra todas las entradaas
meetUpRouter.get('/meetupentries', listMeetUppEntriesController);

//muestra una entrada en concreta ANGELLLLL
meetUpRouter.get('/meetupentries/:entryId', entryExists, getEntryController);

meetUpRouter.get('/categories', meetUpCategoryController);

//edita una entrada
meetUpRouter.put(
    '/meetupentries/:entryId/edit',
    authUser,
    entryExists,
    canEdit,
    editEntryController
);

//vota una entrada
meetUpRouter.post(
    '/meetupentries/:entryId/votes',
    authUser,
    entryExists,
    voteMeetupController
);

//cancela inscripcion meetup
meetUpRouter.delete(
    '/meetups/:meetupId/registration',
    cancelMeetUpRegistrationContoller
);

//borra una entrada
meetUpRouter.delete(
    '/meetupentries/:entryId',
    authUser,
    entryExists,
    canEdit,
    deleteEntryController
);

meetUpRouter.delete(
    '/meetupentries/:entryId/photos/:photoId',
    authUser,
    entryExists,
    canEdit,
    deleteEntryPhotoController
);

export default meetUpRouter;

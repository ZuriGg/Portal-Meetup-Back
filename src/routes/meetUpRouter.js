import express from 'express';

const meetUpRouter = express.Router();

//crea una nueva entrada
meetUpRouter.post('/meetupentries', authUser, newEntryController);

//muestra todas las entradaas
meetUpRouter.get('/meetupentries', listEntriesController);

//muestra una entrada en concreta
meetUpRouter.get('/meetupentries/:entryId', entryExists, getEntryController);

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
    voteEntryController
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

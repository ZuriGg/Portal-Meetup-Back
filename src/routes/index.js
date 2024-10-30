import express from 'express';

// Importamos las rutas de los usuarios y de los meetup.
import userRoutes from './userRoutes.js';
import meetupRoutes from './meetUpRouter.js';

// Creamos un router.
const router = express.Router();

// Indicamos a express dónde están las rutas de los usuarios y las entradas.
router.use(userRoutes);
router.use(meetupRoutes);

export default router;

/* FALTA HACER FUNCIONAL ESTE ARCHIVO INDEX, CONECTÁNDOLO CON EL RESTO DE LAS ROUTES */

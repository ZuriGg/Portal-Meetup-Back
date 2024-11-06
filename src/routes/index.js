import express from 'express';

// Importamos las rutas de los usuarios y de los meetup.
import userRoutes from './userRoutes.js';
import meetupRoutes from './meetupRoutes.js';

// Creamos un router principal.
const router = express.Router();

// Indicamos a express dónde están las rutas de los usuarios y los meetup.
router.use(userRoutes);
router.use(meetupRoutes);

export default router;

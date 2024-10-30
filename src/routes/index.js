import express from 'express';

// Importamos las rutas de los usuarios y de las meetup.
import userRoutes from './userRoutes.js';
import meetupRoutes from './meetupRoutes.js';

// Creamos un router.
const router = express.Router();

// Indicamos a express dónde están las rutas de los usuarios y los meetup.
router.use(userRoutes);
router.use(meetupRoutes);

export default router;

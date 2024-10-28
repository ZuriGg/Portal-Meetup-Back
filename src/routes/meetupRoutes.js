import express from 'express';
import meetUpCategoryController from '../controllers/meetups/meetUpCategoryController.js';

const meetUpRouter = express.Router();

meetUpRouter.get('/categories', meetUpCategoryController);

export default meetUpRouter;

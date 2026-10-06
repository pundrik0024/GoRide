import express from 'express';
import { getRoutes, getPopularRoutes, searchRoutes } from '../controllers/routeController.js';

const router = express.Router();

router.get('/popular', getPopularRoutes);
router.get('/search', searchRoutes);
router.get('/', getRoutes);

export default router;

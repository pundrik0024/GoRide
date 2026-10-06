import express from 'express';
import { createReview, getReviews, getRouteReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/', getReviews);
router.get('/route/:routeId', getRouteReviews);

export default router;

import express from 'express';
import { createBooking, getUserBookings, getBooking, cancelBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createBooking)
  .get(getUserBookings);

router.get('/:id', getBooking);
router.put('/:id/cancel', cancelBooking);

export default router;

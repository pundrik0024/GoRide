import express from 'express';
import { searchSchedules, getSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

router.get('/search', searchSchedules);
router.get('/:id', getSchedule);

export default router;

import express from 'express';
import { getDashboardStats, getAllBookings, getAllPayments, getAllBuses, getAllRoutes, getAllSchedules, getAllUsers } from '../controllers/adminController.js';
import { createBus, updateBus, deleteBus } from '../controllers/busController.js';
import { createRoute, updateRoute, deleteRoute } from '../controllers/routeController.js';
import { createSchedule, updateSchedule, deleteSchedule } from '../controllers/scheduleController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.use(protect, admin);

router.get('/dashboard', getDashboardStats);
router.get('/buses', getAllBuses);
router.get('/routes', getAllRoutes);
router.get('/schedules', getAllSchedules);
router.get('/users', getAllUsers);

router.post('/buses', createBus);
router.put('/buses/:id', updateBus);
router.delete('/buses/:id', deleteBus);

router.post('/routes', createRoute);
router.put('/routes/:id', updateRoute);
router.delete('/routes/:id', deleteRoute);

router.post('/schedules', createSchedule);
router.put('/schedules/:id', updateSchedule);
router.delete('/schedules/:id', deleteSchedule);

router.get('/bookings', getAllBookings);
router.get('/payments', getAllPayments);

export default router;

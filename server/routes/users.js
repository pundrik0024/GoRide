import express from 'express';
import { getUsers, getUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.use(protect, admin);

router.get('/', getUsers);
router.get('/:id', getUser);

export default router;

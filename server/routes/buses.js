import express from 'express';
import { getBuses, getBus } from '../controllers/busController.js';

const router = express.Router();

router.get('/', getBuses);
router.get('/:id', getBus);

export default router;

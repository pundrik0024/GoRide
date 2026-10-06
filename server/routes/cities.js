import express from 'express';
import { getCities, searchCities } from '../controllers/cityController.js';

const router = express.Router();

router.get('/search', searchCities);
router.get('/', getCities);

export default router;

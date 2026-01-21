import express from 'express';
import { getRecentQuakes } from '../controllers/quakeController.js';

const router = express.Router();
router.get('/recent', getRecentQuakes);


export default router;



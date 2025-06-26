import express from 'express';
import { listLogs } from '../controllers/logController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, admin, listLogs);

export default router; 
import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { delay } from '../middleware/delay.middleware';
import { listRecords } from '../controllers/record.controller';

const router = Router();
router.get('/', authenticate, delay, listRecords);
export default router;

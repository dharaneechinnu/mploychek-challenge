import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.middleware';
import { getMe, listUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();
router.use(authenticate);
router.get('/me', getMe);
router.get('/', requireAdmin, listUsers);
router.post('/', requireAdmin, createUser);
router.put('/:id', requireAdmin, updateUser);
router.delete('/:id', requireAdmin, deleteUser);
export default router;

import { Router } from 'express';
import { getAdminMetrics } from '../controllers/dashboard.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN'));

router.get('/admin', getAdminMetrics);

export default router;

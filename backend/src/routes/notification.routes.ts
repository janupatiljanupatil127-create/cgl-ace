import { Router } from 'express';
import { createNotification, getNotifications, markAsRead } from '../controllers/notification.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createNotificationSchema } from '../validations/notification.validation';

const router = Router();

router.use(authenticate);

router.get('/', getNotifications);
router.patch('/:id/read', markAsRead);

// Admin notification broadcast route
router.post('/', authorize('ADMIN'), validateRequest(createNotificationSchema), createNotification);

export default router;

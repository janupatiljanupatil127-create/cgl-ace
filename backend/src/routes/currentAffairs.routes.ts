import { Router } from 'express';
import {
  createCurrentAffair,
  getCurrentAffairs,
  getCurrentAffairById,
  updateCurrentAffair,
  deleteCurrentAffair,
} from '../controllers/currentAffairs.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import upload from '../middleware/upload.middleware';
import { createCurrentAffairSchema, updateCurrentAffairSchema } from '../validations/currentAffair.validation';

const router = Router();

router.use(authenticate);

router.get('/', getCurrentAffairs);
router.get('/:id', getCurrentAffairById);

// Admin operations
router.post(
  '/',
  authorize('ADMIN'),
  upload.single('pdf'),
  validateRequest(createCurrentAffairSchema),
  createCurrentAffair
);
router.put('/:id', authorize('ADMIN'), validateRequest(updateCurrentAffairSchema), updateCurrentAffair);
router.delete('/:id', authorize('ADMIN'), deleteCurrentAffair);

export default router;

import { Router } from 'express';
import {
  createPreviousPaper,
  getPreviousPapers,
  updatePreviousPaper,
  deletePreviousPaper,
} from '../controllers/previousPaper.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import upload from '../middleware/upload.middleware';
import { createPreviousPaperSchema, updatePreviousPaperSchema } from '../validations/previousPaper.validation';

const router = Router();

router.use(authenticate);

router.get('/', getPreviousPapers);

// Admin operations
router.post(
  '/',
  authorize('ADMIN'),
  upload.single('pdf'),
  validateRequest(createPreviousPaperSchema),
  createPreviousPaper
);
router.put('/:id', authorize('ADMIN'), validateRequest(updatePreviousPaperSchema), updatePreviousPaper);
router.delete('/:id', authorize('ADMIN'), deletePreviousPaper);

export default router;

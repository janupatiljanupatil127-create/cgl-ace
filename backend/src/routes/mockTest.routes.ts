import { Router } from 'express';
import {
  createMockTest,
  getMockTests,
  getMockTestById,
  updateMockTest,
  deleteMockTest,
  startMockTest,
  saveAnswers,
  submitMockTest,
  getAttemptResult,
} from '../controllers/mockTest.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createMockTestSchema, updateMockTestSchema, saveAnswersSchema } from '../validations/mockTest.validation';

const router = Router();

router.use(authenticate);

// Student & Admin shared routes
router.get('/', getMockTests);
router.get('/:id', getMockTestById);

// Student attempt actions
router.post('/:id/start', startMockTest);
router.post('/attempts/:id/save-answers', validateRequest(saveAnswersSchema), saveAnswers);
router.post('/attempts/:id/submit', submitMockTest);
router.get('/attempts/:id/result', getAttemptResult);

// Admin-only management routes
router.post('/', authorize('ADMIN'), validateRequest(createMockTestSchema), createMockTest);
router.put('/:id', authorize('ADMIN'), validateRequest(updateMockTestSchema), updateMockTest);
router.delete('/:id', authorize('ADMIN'), deleteMockTest);

export default router;

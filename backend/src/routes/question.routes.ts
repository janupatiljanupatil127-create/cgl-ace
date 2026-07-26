import { Router } from 'express';
import {
  createQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} from '../controllers/question.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createQuestionSchema, updateQuestionSchema } from '../validations/question.validation';

const router = Router();

// All question endpoints require authentication and ADMIN role
router.use(authenticate);
router.use(authorize('ADMIN'));

router.get('/', getQuestions);
router.post('/', validateRequest(createQuestionSchema), createQuestion);

router.get('/:id', getQuestionById);
router.put('/:id', validateRequest(updateQuestionSchema), updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;

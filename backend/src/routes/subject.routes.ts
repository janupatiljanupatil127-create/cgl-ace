import { Router } from 'express';
import {
  createSubject,
  getAllSubjects,
  createTopic,
  getTopicsBySubject,
} from '../controllers/subject.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createSubjectSchema, createTopicSchema } from '../validations/subject.validation';

const router = Router();

router.use(authenticate);

router.get('/', getAllSubjects);
router.post('/', authorize('ADMIN'), validateRequest(createSubjectSchema), createSubject);

router.get('/:id/topics', getTopicsBySubject);
router.post('/:id/topics', authorize('ADMIN'), validateRequest(createTopicSchema), createTopic);

export default router;

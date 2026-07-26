import { Router } from 'express';
import {
  createStudyMaterial,
  getStudyMaterials,
  updateStudyMaterial,
  deleteStudyMaterial,
} from '../controllers/studyMaterial.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import upload from '../middleware/upload.middleware';
import { createStudyMaterialSchema, updateStudyMaterialSchema } from '../validations/studyMaterial.validation';

const router = Router();

router.use(authenticate);

router.get('/', getStudyMaterials);

// Admin-only PDF uploading & editing
router.post(
  '/',
  authorize('ADMIN'),
  upload.single('pdf'),
  validateRequest(createStudyMaterialSchema),
  createStudyMaterial
);

router.put('/:id', authorize('ADMIN'), validateRequest(updateStudyMaterialSchema), updateStudyMaterial);
router.delete('/:id', authorize('ADMIN'), deleteStudyMaterial);

export default router;

import { Router } from 'express';
import { getProfile, updateProfile, uploadProfilePicture, getStatistics } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import upload from '../middleware/upload.middleware';
import { updateProfileSchema } from '../validations/user.validation';

const router = Router();

router.use(authenticate);

router.get('/profile', getProfile);
router.put('/profile', validateRequest(updateProfileSchema), updateProfile);
router.post('/profile/picture', upload.single('profilePicture'), uploadProfilePicture);
router.get('/statistics', getStatistics);

export default router;

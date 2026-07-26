import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import subjectRoutes from './subject.routes';
import questionRoutes from './question.routes';
import mockTestRoutes from './mockTest.routes';
import studyMaterialRoutes from './studyMaterial.routes';
import currentAffairsRoutes from './currentAffairs.routes';
import previousPaperRoutes from './previousPaper.routes';
import bookmarkRoutes from './bookmark.routes';
import notificationRoutes from './notification.routes';
import dashboardRoutes from './dashboard.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/subjects', subjectRoutes);
router.use('/questions', questionRoutes);
router.use('/mock-tests', mockTestRoutes);
router.use('/study-materials', studyMaterialRoutes);
router.use('/current-affairs', currentAffairsRoutes);
router.use('/previous-papers', previousPaperRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/notifications', notificationRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;

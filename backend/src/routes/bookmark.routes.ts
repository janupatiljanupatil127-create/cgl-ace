import { Router } from 'express';
import { toggleBookmark, getBookmarks } from '../controllers/bookmark.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { toggleBookmarkSchema, getBookmarksSchema } from '../validations/bookmark.validation';

const router = Router();

router.use(authenticate);

router.get('/', validateRequest(getBookmarksSchema), getBookmarks);
router.post('/', validateRequest(toggleBookmarkSchema), toggleBookmark);

export default router;

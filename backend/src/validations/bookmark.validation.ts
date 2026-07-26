import { z } from 'zod';
import { BOOKMARK_TYPES } from '../constants';

export const toggleBookmarkSchema = z.object({
  body: z.object({
    type: z.nativeEnum(BOOKMARK_TYPES),
    questionId: z.string().uuid('Invalid question ID').optional().nullable(),
    studyMaterialId: z.string().uuid('Invalid study material ID').optional().nullable(),
    mockTestId: z.string().uuid('Invalid mock test ID').optional().nullable(),
  }),
});
export const getBookmarksSchema = z.object({
  query: z.object({
    type: z.nativeEnum(BOOKMARK_TYPES).optional(),
  }),
});

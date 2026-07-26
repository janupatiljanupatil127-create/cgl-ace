import { z } from 'zod';

export const createStudyMaterialSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    subjectId: z.string().uuid('Invalid subject ID'),
    topicId: z.string().uuid('Invalid topic ID'),
    pdfUrl: z.string().url('Invalid PDF URL').optional(), // Optional since file uploads provide this
  }),
});

export const updateStudyMaterialSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    subjectId: z.string().uuid().optional(),
    topicId: z.string().uuid().optional(),
    pdfUrl: z.string().url().optional(),
  }),
});

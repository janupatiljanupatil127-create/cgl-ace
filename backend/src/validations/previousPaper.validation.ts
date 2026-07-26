import { z } from 'zod';

export const createPreviousPaperSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    year: z.number().int().min(2000, 'Year must be 2000 or later').max(new Date().getFullYear() + 1),
    examType: z.string().min(2, 'Exam type must be specified'),
    pdfUrl: z.string().url('Invalid PDF URL').optional(),
    subjectId: z.string().uuid('Invalid subject ID'),
  }),
});

export const updatePreviousPaperSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    year: z.number().int().min(2000).max(new Date().getFullYear() + 1).optional(),
    examType: z.string().min(2).optional(),
    pdfUrl: z.string().url().optional(),
    subjectId: z.string().uuid().optional(),
  }),
});

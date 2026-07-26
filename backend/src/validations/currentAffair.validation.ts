import { z } from 'zod';
import { CURRENT_AFFAIR_TYPES } from '../constants';

export const createCurrentAffairSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    content: z.string().min(5, 'Content must be at least 5 characters'),
    pdfUrl: z.string().url('Invalid PDF URL').optional(),
    date: z.string().datetime({ precision: 3 }).optional().or(z.string().date().optional()),
    type: z.nativeEnum(CURRENT_AFFAIR_TYPES).default('DAILY'),
  }),
});

export const updateCurrentAffairSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    content: z.string().min(5).optional(),
    pdfUrl: z.string().url().optional(),
    date: z.string().optional(),
    type: z.nativeEnum(CURRENT_AFFAIR_TYPES).optional(),
  }),
});

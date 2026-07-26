import { z } from 'zod';

export const createSubjectSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Subject name must be at least 2 characters'),
    code: z.string().min(2, 'Subject code must be at least 2 characters').toUpperCase(),
    description: z.string().optional(),
  }),
});

export const createTopicSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Topic name must be at least 2 characters'),
    description: z.string().optional(),
  }),
});

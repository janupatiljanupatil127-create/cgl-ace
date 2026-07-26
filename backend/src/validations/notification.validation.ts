import { z } from 'zod';

export const createNotificationSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    message: z.string().min(5, 'Message must be at least 5 characters'),
    userId: z.string().uuid('Invalid user ID').optional().nullable(),
  }),
});

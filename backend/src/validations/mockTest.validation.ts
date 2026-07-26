import { z } from 'zod';

export const createMockTestSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    duration: z.number().int().positive('Duration must be a positive integer in minutes'),
    totalMarks: z.number().positive('Total marks must be positive'),
    passingMarks: z.number().positive('Passing marks must be positive'),
    isPublished: z.boolean().default(false),
    questionIds: z.array(z.string().uuid('Invalid question ID')).min(1, 'A mock test must contain at least 1 question'),
  }),
});

export const updateMockTestSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    duration: z.number().int().positive().optional(),
    totalMarks: z.number().positive().optional(),
    passingMarks: z.number().positive().optional(),
    isPublished: z.boolean().optional(),
    questionIds: z.array(z.string().uuid()).optional(),
  }),
});

export const saveAnswersSchema = z.object({
  body: z.object({
    answers: z.array(
      z.object({
        questionId: z.string().uuid('Invalid question ID'),
        selectedOptionId: z.string().uuid('Invalid option ID').nullable(),
        timeSpent: z.number().nonnegative('Time spent must be 0 or positive in seconds'),
        status: z.enum(['ANSWERED', 'UNANSWERED', 'MARKED_FOR_REVIEW']),
      })
    ),
  }),
});

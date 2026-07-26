import { z } from 'zod';
import { DIFFICULTY_LEVELS } from '../constants';

export const createQuestionSchema = z.object({
  body: z.object({
    questionText: z.string().min(5, 'Question text must be at least 5 characters'),
    explanation: z.string().optional(),
    subjectId: z.string().uuid('Invalid subject ID'),
    topicId: z.string().uuid('Invalid topic ID'),
    difficulty: z.nativeEnum(DIFFICULTY_LEVELS).default('MEDIUM'),
    marks: z.number().positive('Marks must be positive').default(2.0),
    negativeMarks: z.number().nonnegative('Negative marks must be 0 or positive').default(0.5),
    options: z.array(
      z.object({
        text: z.string().min(1, 'Option text is required'),
        isCorrect: z.boolean().default(false),
      })
    ).min(2, 'A question must have at least 2 options')
     .refine(
       (opts) => opts.filter(o => o.isCorrect).length === 1,
       'Exactly one option must be marked correct'
     ),
  }),
});

export const updateQuestionSchema = z.object({
  body: z.object({
    questionText: z.string().min(5).optional(),
    explanation: z.string().optional(),
    subjectId: z.string().uuid().optional(),
    topicId: z.string().uuid().optional(),
    difficulty: z.nativeEnum(DIFFICULTY_LEVELS).optional(),
    marks: z.number().positive().optional(),
    negativeMarks: z.number().nonnegative().optional(),
    options: z.array(
      z.object({
        id: z.string().uuid().optional(),
        text: z.string().min(1),
        isCorrect: z.boolean(),
      })
    ).min(2).optional()
     .refine(
       (opts) => {
         if (!opts) return true;
         return opts.filter(o => o.isCorrect).length === 1;
       },
       'Exactly one option must be marked correct'
     ),
  }),
});

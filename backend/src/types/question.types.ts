import { z } from 'zod';
import { createQuestionSchema, updateQuestionSchema } from '../validations/question.validation';

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>['body'];
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>['body'];

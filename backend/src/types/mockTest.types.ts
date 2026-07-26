import { z } from 'zod';
import { createMockTestSchema, updateMockTestSchema, saveAnswersSchema } from '../validations/mockTest.validation';

export type CreateMockTestInput = z.infer<typeof createMockTestSchema>['body'];
export type UpdateMockTestInput = z.infer<typeof updateMockTestSchema>['body'];
export type SaveAnswersInput = z.infer<typeof saveAnswersSchema>['body'];

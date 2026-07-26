import { Request, Response } from 'express';
import { QuestionService } from '../services/question.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/response';

export const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const question = await QuestionService.createQuestion(req.body);
  sendCreated(res, 'Question created successfully', question);
});

export const getQuestionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const question = await QuestionService.getQuestionById(id);
  sendSuccess(res, 'Question retrieved successfully', question);
});

export const getQuestions = catchAsync(async (req: Request, res: Response) => {
  const { subjectId, topicId, difficulty, search, limit, offset } = req.query;

  const result = await QuestionService.queryQuestions({
    subjectId: subjectId as string,
    topicId: topicId as string,
    difficulty: difficulty as any,
    search: search as string,
    limit: limit ? parseInt(limit as string, 10) : undefined,
    offset: offset ? parseInt(offset as string, 10) : undefined,
  });

  sendSuccess(res, 'Questions retrieved successfully', result);
});

export const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const question = await QuestionService.updateQuestion(id, req.body);
  sendSuccess(res, 'Question updated successfully', question);
});

export const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await QuestionService.deleteQuestion(id);
  sendSuccess(res, 'Question deleted successfully');
});

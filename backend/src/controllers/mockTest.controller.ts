import { Request, Response } from 'express';
import { MockTestService } from '../services/mockTest.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess, sendCreated } from '../utils/response';

export const createMockTest = catchAsync(async (req: Request, res: Response) => {
  const mockTest = await MockTestService.createMockTest(req.body);
  sendCreated(res, 'Mock test created successfully', mockTest);
});

export const getMockTests = catchAsync(async (req: Request, res: Response) => {
  const role = (req.user as any).role;
  const mockTests = await MockTestService.getMockTests(role);
  sendSuccess(res, 'Mock tests retrieved successfully', mockTests);
});

export const getMockTestById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const role = (req.user as any).role;
  const mockTest = await MockTestService.getMockTestById(id, role);
  sendSuccess(res, 'Mock test retrieved successfully', mockTest);
});

export const updateMockTest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const mockTest = await MockTestService.updateMockTest(id, req.body);
  sendSuccess(res, 'Mock test updated successfully', mockTest);
});

export const deleteMockTest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await MockTestService.deleteMockTest(id);
  sendSuccess(res, 'Mock test deleted successfully');
});

export const startMockTest = catchAsync(async (req: Request, res: Response) => {
  const { id: mockTestId } = req.params;
  const userId = (req.user as any).id;
  const attempt = await MockTestService.startMockTest(mockTestId, userId);
  sendSuccess(res, 'Mock test started successfully', attempt);
});

export const saveAnswers = catchAsync(async (req: Request, res: Response) => {
  const { id: attemptId } = req.params;
  const userId = (req.user as any).id;
  const result = await MockTestService.saveAnswers(attemptId, userId, req.body);
  sendSuccess(res, result.message);
});

export const submitMockTest = catchAsync(async (req: Request, res: Response) => {
  const { id: attemptId } = req.params;
  const userId = (req.user as any).id;
  const { autoSubmit } = req.query;

  const isAuto = autoSubmit === 'true';

  const result = await MockTestService.submitMockTest(attemptId, userId, isAuto);
  sendSuccess(res, 'Mock test submitted successfully', result);
});

export const getAttemptResult = catchAsync(async (req: Request, res: Response) => {
  const { id: attemptId } = req.params;
  const userId = (req.user as any).id;
  const role = (req.user as any).role;

  const result = await MockTestService.getAttemptResult(attemptId, userId, role);
  sendSuccess(res, 'Attempt result retrieved successfully', result);
});

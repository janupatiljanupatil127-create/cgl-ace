import { Request, Response } from 'express';
import { PreviousPaperService } from '../services/previousPaper.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess, sendCreated } from '../utils/response';
import { BadRequestError } from '../utils/errors';

export const createPreviousPaper = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new BadRequestError('PDF paper file is required.');
  }

  // Parse year field to number
  if (req.body.year) {
    req.body.year = parseInt(req.body.year, 10);
  }

  const paper = await PreviousPaperService.createPreviousPaper(req.body, req.file.buffer);
  sendCreated(res, 'Previous year paper created successfully', paper);
});

export const getPreviousPapers = catchAsync(async (req: Request, res: Response) => {
  const { subjectId, year, examType } = req.query;

  const papers = await PreviousPaperService.getPreviousPapers({
    subjectId: subjectId as string,
    year: year ? parseInt(year as string, 10) : undefined,
    examType: examType as string,
  });

  sendSuccess(res, 'Previous papers retrieved successfully', papers);
});

export const updatePreviousPaper = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.body.year) {
    req.body.year = parseInt(req.body.year, 10);
  }

  const paper = await PreviousPaperService.updatePreviousPaper(id, req.body);
  sendSuccess(res, 'Previous year paper updated successfully', paper);
});

export const deletePreviousPaper = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await PreviousPaperService.deletePreviousPaper(id);
  sendSuccess(res, 'Previous year paper deleted successfully');
});

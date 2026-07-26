import { Request, Response } from 'express';
import { CurrentAffairsService } from '../services/currentAffairs.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess, sendCreated } from '../utils/response';

export const createCurrentAffair = catchAsync(async (req: Request, res: Response) => {
  const fileBuffer = req.file?.buffer;
  
  // Parse date if present
  if (req.body.date) {
    req.body.date = new Date(req.body.date);
  }

  const item = await CurrentAffairsService.createCurrentAffair(req.body, fileBuffer);
  sendCreated(res, 'Current affairs entry created successfully', item);
});

export const getCurrentAffairs = catchAsync(async (req: Request, res: Response) => {
  const { type, limit, offset } = req.query;

  const result = await CurrentAffairsService.getCurrentAffairs({
    type: type as any,
    limit: limit ? parseInt(limit as string, 10) : undefined,
    offset: offset ? parseInt(offset as string, 10) : undefined,
  });

  sendSuccess(res, 'Current affairs retrieved successfully', result);
});

export const getCurrentAffairById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await CurrentAffairsService.getCurrentAffairById(id);
  sendSuccess(res, 'Current affairs entry retrieved successfully', item);
});

export const updateCurrentAffair = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (req.body.date) {
    req.body.date = new Date(req.body.date);
  }

  const item = await CurrentAffairsService.updateCurrentAffair(id, req.body);
  sendSuccess(res, 'Current affairs entry updated successfully', item);
});

export const deleteCurrentAffair = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await CurrentAffairsService.deleteCurrentAffair(id);
  sendSuccess(res, 'Current affairs entry deleted successfully');
});

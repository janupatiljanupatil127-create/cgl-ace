import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';

export const getAdminMetrics = catchAsync(async (req: Request, res: Response) => {
  const metrics = await DashboardService.getAdminMetrics();
  sendSuccess(res, 'Admin dashboard metrics retrieved successfully', metrics);
});

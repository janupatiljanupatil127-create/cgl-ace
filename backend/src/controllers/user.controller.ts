import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';
import { BadRequestError } from '../utils/errors';

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const profile = await UserService.getProfile(userId);
  sendSuccess(res, 'Profile retrieved successfully', profile);
});

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const profile = await UserService.updateProfile(userId, req.body);
  sendSuccess(res, 'Profile updated successfully', profile);
});

export const uploadProfilePicture = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;

  if (!req.file) {
    throw new BadRequestError('No profile image file uploaded.');
  }

  const result = await UserService.updateProfilePicture(userId, req.file.buffer);
  sendSuccess(res, 'Profile picture uploaded successfully', result);
});

export const getStatistics = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const stats = await UserService.getStatistics(userId);
  sendSuccess(res, 'Statistics retrieved successfully', stats);
});

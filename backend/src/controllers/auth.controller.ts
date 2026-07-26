import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess, sendCreated } from '../utils/response';

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  sendCreated(res, result.message);
});

export const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.verifyOtp(req.body);
  sendSuccess(res, result.message);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  const result = await AuthService.login(req.body, ip, userAgent);
  sendSuccess(res, 'Login successful', result);
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  const { refreshToken } = req.body;
  const userId = (req.user as any).id;

  await AuthService.logout(refreshToken, userId, ip, userAgent);
  sendSuccess(res, 'Logout successful');
});

export const refresh = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const result = await AuthService.refreshTokens(refreshToken);
  sendSuccess(res, 'Token refreshed successfully', result);
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.forgotPassword(req.body);
  sendSuccess(res, result.message);
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.resetPassword(req.body);
  sendSuccess(res, result.message);
});

export const changePassword = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const result = await AuthService.changePassword(userId, req.body);
  sendSuccess(res, result.message);
});

import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess, sendCreated } from '../utils/response';

export const createNotification = catchAsync(async (req: Request, res: Response) => {
  const notification = await NotificationService.createNotification(req.body);
  sendCreated(res, 'Notification created successfully', notification);
});

export const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const list = await NotificationService.getNotifications(userId);
  sendSuccess(res, 'Notifications retrieved successfully', list);
});

export const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req.user as any).id;

  const notification = await NotificationService.markAsRead(id, userId);
  sendSuccess(res, 'Notification marked as read successfully', notification);
});

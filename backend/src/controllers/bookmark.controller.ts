import { Request, Response } from 'express';
import { BookmarkService } from '../services/bookmark.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';
import { BookmarkType } from '@prisma/client';

export const toggleBookmark = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const result = await BookmarkService.toggleBookmark(userId, req.body);
  sendSuccess(res, result.message, result);
});

export const getBookmarks = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const { type } = req.query;

  const bookmarks = await BookmarkService.getBookmarks(userId, type as BookmarkType);
  sendSuccess(res, 'Bookmarks retrieved successfully', bookmarks);
});

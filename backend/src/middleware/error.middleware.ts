import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors';
import { HttpStatus } from '../constants';
import logger from '../config/logger';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let errors: unknown[] = [];

  // Log error
  logger.error(`${err.message}\nStack: ${err.stack || ''}`);

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'ValidationError' || err.name === 'ZodError') {
    statusCode = HttpStatus.BAD_REQUEST;
    message = 'Validation Error';
    // If it's Zod error, format it nicely
    if ('issues' in err) {
      errors = (err as any).issues.map((issue: any) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
    }
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = HttpStatus.UNAUTHORIZED;
    message = 'Invalid authentication token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = HttpStatus.UNAUTHORIZED;
    message = 'Authentication token expired';
  } else if (err.message && err.message.includes('Prisma')) {
    // Handle Prisma specific db errors gracefully
    if (err.message.includes('Unique constraint failed')) {
      statusCode = HttpStatus.CONFLICT;
      message = 'A record with this field already exists.';
    } else if (err.message.includes('Record to update not found') || err.message.includes('Record to delete not found')) {
      statusCode = HttpStatus.NOT_FOUND;
      message = 'Resource not found or already deleted.';
    } else {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Database operation failed.';
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

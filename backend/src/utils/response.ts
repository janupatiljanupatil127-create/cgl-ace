import { Response } from 'express';
import { HttpStatus } from '../constants';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = HttpStatus.OK
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendCreated = <T>(
  res: Response,
  message: string,
  data?: T
): void => {
  sendSuccess(res, message, data, HttpStatus.CREATED);
};

export const sendNoContent = (res: Response): void => {
  res.status(HttpStatus.NO_CONTENT).send();
};

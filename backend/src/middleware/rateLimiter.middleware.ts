import rateLimit from 'express-rate-limit';
import { HttpStatus } from '../constants';
import dotenv from 'dotenv';

dotenv.config();

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10);

export const apiLimiter = rateLimit({
  windowMs,
  max: maxRequests,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 20, // max 20 login/signup attempts per 15 mins
  message: {
    success: false,
    message: 'Too many auth requests, please try again after 15 minutes.',
  },
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
});

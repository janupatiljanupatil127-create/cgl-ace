import { Router } from 'express';
import {
  register,
  verifyOtp,
  login,
  logout,
  refresh,
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { authLimiter } from '../middleware/rateLimiter.middleware';
import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  refreshTokenSchema,
} from '../validations/auth.validation';

const router = Router();

router.post('/register', authLimiter, validateRequest(registerSchema), register);
router.post('/verify-otp', authLimiter, validateRequest(verifyOtpSchema), verifyOtp);
router.post('/login', authLimiter, validateRequest(loginSchema), login);
router.post('/refresh-token', validateRequest(refreshTokenSchema), refresh);
router.post('/forgot-password', authLimiter, validateRequest(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', authLimiter, validateRequest(resetPasswordSchema), resetPassword);

// Authenticated Routes
router.post('/logout', authenticate, validateRequest(refreshTokenSchema), logout);
router.patch('/change-password', authenticate, validateRequest(changePasswordSchema), changePassword);

export default router;

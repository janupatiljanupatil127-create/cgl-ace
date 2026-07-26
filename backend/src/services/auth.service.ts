import bcrypt from 'bcryptjs';
import prisma from '../config/db';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { generateOtpCode } from '../utils/otp';
import { sendEmail } from '../config/nodemailer';
import { ApiError, BadRequestError, NotFoundError, UnauthorizedError, ConflictError } from '../utils/errors';
import { RegisterInput, LoginInput, VerifyOtpInput, ForgotPasswordInput, ResetPasswordInput, ChangePasswordInput } from '../types/auth.types';
import { JwtTokens, UserPayload } from '../types';
import logger from '../config/logger';

export class AuthService {
  static async register(data: RegisterInput): Promise<{ message: string }> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: 'STUDENT',
      },
    });

    // Generate Email Verification OTP
    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await prisma.oTP.create({
      data: {
        code,
        type: 'EMAIL_VERIFICATION',
        email: user.email,
        expiresAt,
        userId: user.id,
      },
    });

    // Send Email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Welcome to CGL Ace!</h2>
        <p>Thank you for registering. Please verify your email using the following One-Time Password (OTP):</p>
        <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; padding: 15px; background-color: #f4f4f4; text-align: center; width: 200px; margin: 20px 0;">
          ${code}
        </div>
        <p>This OTP is valid for 10 minutes. If you did not register for this account, please ignore this email.</p>
        <p>Best regards,<br/>The CGL Ace Team</p>
      </div>
    `;
    await sendEmail(user.email, 'Verify Your Email - CGL Ace', emailHtml);

    return { message: 'Registration successful. Verification OTP sent to your email.' };
  }

  static async verifyOtp(data: VerifyOtpInput): Promise<{ message: string }> {
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        email: data.email,
        code: data.code,
        type: data.type,
        isUsed: false,
        expiresAt: { gte: new Date() },
      },
    });

    if (!otpRecord) {
      throw new BadRequestError('Invalid or expired OTP code');
    }

    // Mark OTP as used
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { isUsed: true },
    });

    if (data.type === 'EMAIL_VERIFICATION') {
      await prisma.user.update({
        where: { id: otpRecord.userId },
        data: { isEmailVerified: true },
      });
      return { message: 'Email verified successfully.' };
    }

    return { message: 'OTP verified successfully. You may now reset your password.' };
  }

  static async login(data: LoginInput, ip: string, userAgent: string): Promise<JwtTokens & { user: UserPayload }> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedError('Please verify your email before logging in');
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save refresh token to DB
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    // Log Activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        ipAddress: ip,
        userAgent,
      },
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  static async logout(refreshToken: string, userId: string, ip: string, userAgent: string): Promise<void> {
    const deletedToken = await prisma.refreshToken.deleteMany({
      where: { token: refreshToken, userId },
    });

    if (deletedToken.count === 0) {
      throw new BadRequestError('Invalid refresh token');
    }

    // Log Activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'LOGOUT',
        ipAddress: ip,
        userAgent,
      },
    });
  }

  static async refreshTokens(token: string): Promise<JwtTokens> {
    const dbToken = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!dbToken || dbToken.expiresAt < new Date()) {
      if (dbToken) {
        await prisma.refreshToken.delete({ where: { id: dbToken.id } });
      }
      throw new UnauthorizedError('Refresh token expired or invalid');
    }

    try {
      const decoded = verifyRefreshToken(token);
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      
      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      const payload: UserPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = generateAccessToken(payload);
      const newRefreshToken = generateRefreshToken(payload);

      // Rotate tokens
      await prisma.refreshToken.delete({ where: { id: dbToken.id } });
      await prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  static async forgotPassword(data: ForgotPasswordInput): Promise<{ message: string }> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundError('No account found with this email address');
    }

    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.oTP.create({
      data: {
        code,
        type: 'PASSWORD_RESET',
        email: user.email,
        expiresAt,
        userId: user.id,
      },
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your CGL Ace account. Use the following One-Time Password (OTP) to proceed:</p>
        <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; padding: 15px; background-color: #f4f4f4; text-align: center; width: 200px; margin: 20px 0;">
          ${code}
        </div>
        <p>This OTP is valid for 10 minutes. If you did not request this, you can safely ignore this email.</p>
        <p>Best regards,<br/>The CGL Ace Team</p>
      </div>
    `;
    await sendEmail(user.email, 'Reset Your Password - CGL Ace', emailHtml);

    return { message: 'Password reset OTP sent to your email.' };
  }

  static async resetPassword(data: ResetPasswordInput): Promise<{ message: string }> {
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        email: data.email,
        code: data.code,
        type: 'PASSWORD_RESET',
        isUsed: false,
        expiresAt: { gte: new Date() },
      },
    });

    if (!otpRecord) {
      throw new BadRequestError('Invalid or expired OTP code');
    }

    // Mark OTP as used
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { isUsed: true },
    });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.update({
      where: { id: otpRecord.userId },
      data: { password: hashedPassword },
    });

    // Revoke all existing refresh tokens for this user
    await prisma.refreshToken.deleteMany({
      where: { userId: otpRecord.userId },
    });

    return { message: 'Password reset successfully. You can now login with your new password.' };
  }

  static async changePassword(userId: string, data: ChangePasswordInput): Promise<{ message: string }> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isMatch = await bcrypt.compare(data.currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestError('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully.' };
  }
}

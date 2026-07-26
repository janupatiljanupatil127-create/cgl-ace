import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const accessSecret = process.env.JWT_SECRET || 'super_secret_jwt_access_token_key_12345';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'super_secret_jwt_refresh_token_key_54321';
const accessExpiry = process.env.JWT_ACCESS_EXPIRATION || '15m';
const refreshExpiry = process.env.JWT_REFRESH_EXPIRATION || '7d';

export const generateAccessToken = (payload: UserPayload): string => {
  return jwt.sign(payload, accessSecret, { expiresIn: accessExpiry as any });
};

export const generateRefreshToken = (payload: UserPayload): string => {
  return jwt.sign(payload, refreshSecret, { expiresIn: refreshExpiry as any });
};

export const verifyAccessToken = (token: string): UserPayload => {
  return jwt.verify(token, accessSecret) as UserPayload;
};

export const verifyRefreshToken = (token: string): UserPayload => {
  return jwt.verify(token, refreshSecret) as UserPayload;
};

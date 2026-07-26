import { Request } from 'express';
import { Role } from '@prisma/client';

export interface UserPayload {
  id: string;
  email: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

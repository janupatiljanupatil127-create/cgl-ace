import crypto from 'crypto';

export const generateOtpCode = (): string => {
  // Generate a cryptographically secure 6-digit number
  return Math.floor(100000 + crypto.randomInt(900000)).toString();
};

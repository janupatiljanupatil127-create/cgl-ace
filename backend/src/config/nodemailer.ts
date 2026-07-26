import nodemailer from 'nodemailer';
import logger from './logger';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: parseInt(process.env.SMTP_PORT || '2525', 10),
  auth: {
    user: process.env.SMTP_USER || 'dummy_user',
    pass: process.env.SMTP_PASS || 'dummy_pass',
  },
});

export const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@cglace.com',
      to,
      subject,
      html,
    });
    logger.info(`Email sent successfully: ${info.messageId}`);
  } catch (error) {
    logger.error('Failed to send email:', error);
    // In development/test environment, we don't throw to prevent blocking the flow
    if (process.env.NODE_ENV === 'production') {
      throw error;
    } else {
      logger.warn(`EMAIL SEND SIMULATION (DEV): To: ${to} | Subject: ${subject}`);
    }
  }
};

export default transporter;

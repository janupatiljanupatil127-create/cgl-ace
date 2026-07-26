import app from './app';
import logger from './config/logger';
import prisma from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  logger.info(`=================================`);
  logger.info(`  Server running on port ${port}  `);
  logger.info(`  Environment: ${process.env.NODE_ENV}  `);
  logger.info(`  API Docs: http://localhost:${port}/api-docs  `);
  logger.info(`=================================`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}\nStack: ${error.stack}`);
  gracefulShutdown(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any) => {
  logger.error(`Unhandled Rejection: ${reason?.message || reason}\nStack: ${reason?.stack}`);
  gracefulShutdown(1);
});

// Handle termination signals
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Starting graceful shutdown...');
  gracefulShutdown(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Starting graceful shutdown...');
  gracefulShutdown(0);
});

function gracefulShutdown(code: number) {
  server.close(async () => {
    logger.info('HTTP server closed.');
    try {
      await prisma.$disconnect();
      logger.info('Database connection closed.');
      process.exit(code);
    } catch (err: any) {
      logger.error(`Error closing database: ${err.message}`);
      process.exit(1);
    }
  });

  // Force close after 10s
  setTimeout(() => {
    logger.error('Forcing shutdown due to timeout.');
    process.exit(1);
  }, 10000);
}

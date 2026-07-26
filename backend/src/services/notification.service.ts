import prisma from '../config/db';
import { NotFoundError, ForbiddenError } from '../utils/errors';

export class NotificationService {
  static async createNotification(data: { title: string; message: string; userId?: string | null }) {
    return prisma.notification.create({
      data: {
        title: data.title,
        message: data.message,
        userId: data.userId || null,
      },
    });
  }

  static async getNotifications(userId: string) {
    return prisma.notification.findMany({
      where: {
        OR: [
          { userId },
          { userId: null }, // Broadcast notifications
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async markAsRead(id: string, userId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    if (notification.userId && notification.userId !== userId) {
      throw new ForbiddenError('Access denied');
    }

    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}

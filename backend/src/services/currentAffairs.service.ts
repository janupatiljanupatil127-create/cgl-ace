import prisma from '../config/db';
import { NotFoundError } from '../utils/errors';
import { uploadToCloudinary } from '../config/cloudinary';
import { CurrentAffairType } from '@prisma/client';

export class CurrentAffairsService {
  static async createCurrentAffair(
    data: { title: string; description?: string; content: string; type: CurrentAffairType; date?: Date },
    fileBuffer?: Buffer
  ) {
    let pdfUrl: string | undefined;

    if (fileBuffer) {
      pdfUrl = await uploadToCloudinary(fileBuffer, 'cgl_ace_current_affairs');
    }

    return prisma.currentAffair.create({
      data: {
        ...data,
        ...(pdfUrl && { pdfUrl }),
      },
    });
  }

  static async getCurrentAffairs(filters: { type?: CurrentAffairType; limit?: number; offset?: number }) {
    const { type, limit = 10, offset = 0 } = filters;

    const where = type ? { type } : {};

    const [total, items] = await prisma.$transaction([
      prisma.currentAffair.count({ where }),
      prisma.currentAffair.findMany({
        where,
        orderBy: { date: 'desc' },
        take: limit,
        skip: offset,
      }),
    ]);

    return {
      total,
      limit,
      offset,
      items,
    };
  }

  static async getCurrentAffairById(id: string) {
    const item = await prisma.currentAffair.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundError('Current affairs entry not found');
    }

    return item;
  }

  static async updateCurrentAffair(
    id: string,
    data: { title?: string; description?: string; content?: string; type?: CurrentAffairType; pdfUrl?: string; date?: Date }
  ) {
    const existing = await prisma.currentAffair.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError('Current affairs entry not found');
    }

    return prisma.currentAffair.update({
      where: { id },
      data,
    });
  }

  static async deleteCurrentAffair(id: string) {
    const existing = await prisma.currentAffair.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError('Current affairs entry not found');
    }

    await prisma.currentAffair.delete({
      where: { id },
    });

    return { message: 'Current affairs entry deleted successfully' };
  }
}

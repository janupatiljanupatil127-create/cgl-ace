import prisma from '../config/db';
import { NotFoundError } from '../utils/errors';
import { uploadToCloudinary } from '../config/cloudinary';

export class PreviousPaperService {
  static async createPreviousPaper(
    data: { title: string; year: number; examType: string; subjectId: string },
    fileBuffer: Buffer
  ) {
    const pdfUrl = await uploadToCloudinary(fileBuffer, 'cgl_ace_previous_papers');

    return prisma.previousPaper.create({
      data: {
        ...data,
        pdfUrl,
      },
      include: {
        subject: true,
      },
    });
  }

  static async getPreviousPapers(filters: { subjectId?: string; year?: number; examType?: string }) {
    const { subjectId, year, examType } = filters;

    const where = {
      ...(subjectId && { subjectId }),
      ...(year && { year }),
      ...(examType && { examType: { contains: examType, mode: 'insensitive' as const } }),
    };

    return prisma.previousPaper.findMany({
      where,
      include: {
        subject: true,
      },
      orderBy: { year: 'desc' },
    });
  }

  static async updatePreviousPaper(
    id: string,
    data: { title?: string; year?: number; examType?: string; subjectId?: string; pdfUrl?: string }
  ) {
    const existing = await prisma.previousPaper.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError('Previous paper entry not found');
    }

    return prisma.previousPaper.update({
      where: { id },
      data,
      include: {
        subject: true,
      },
    });
  }

  static async deletePreviousPaper(id: string) {
    const existing = await prisma.previousPaper.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError('Previous paper entry not found');
    }

    await prisma.previousPaper.delete({
      where: { id },
    });

    return { message: 'Previous paper entry deleted successfully' };
  }
}

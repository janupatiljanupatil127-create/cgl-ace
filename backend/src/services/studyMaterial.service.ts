import prisma from '../config/db';
import { NotFoundError } from '../utils/errors';
import { uploadToCloudinary } from '../config/cloudinary';

export class StudyMaterialService {
  static async createStudyMaterial(
    data: { title: string; description?: string; subjectId: string; topicId: string },
    fileBuffer: Buffer,
    uploadedById: string
  ) {
    // 1. Upload PDF to Cloudinary
    const pdfUrl = await uploadToCloudinary(fileBuffer, 'cgl_ace_study_materials');

    // 2. Save in database
    return prisma.studyMaterial.create({
      data: {
        ...data,
        pdfUrl,
        uploadedById,
      },
      include: {
        subject: true,
        topic: true,
      },
    });
  }

  static async getStudyMaterials(filters: { subjectId?: string; topicId?: string; search?: string }) {
    const { subjectId, topicId, search } = filters;

    const where = {
      ...(subjectId && { subjectId }),
      ...(topicId && { topicId }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    };

    return prisma.studyMaterial.findMany({
      where,
      include: {
        subject: true,
        topic: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async updateStudyMaterial(
    id: string,
    data: { title?: string; description?: string; subjectId?: string; topicId?: string; pdfUrl?: string }
  ) {
    const existing = await prisma.studyMaterial.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError('Study material not found');
    }

    return prisma.studyMaterial.update({
      where: { id },
      data,
      include: {
        subject: true,
        topic: true,
      },
    });
  }

  static async deleteStudyMaterial(id: string) {
    const existing = await prisma.studyMaterial.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError('Study material not found');
    }

    await prisma.studyMaterial.delete({
      where: { id },
    });

    return { message: 'Study material deleted successfully' };
  }
}

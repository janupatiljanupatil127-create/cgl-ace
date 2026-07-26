import prisma from '../config/db';
import { ConflictError, NotFoundError } from '../utils/errors';

export class SubjectService {
  static async createSubject(data: { name: string; code: string; description?: string }) {
    const existingCode = await prisma.subject.findFirst({
      where: {
        OR: [
          { name: data.name },
          { code: data.code },
        ],
      },
    });

    if (existingCode) {
      throw new ConflictError('Subject with this name or code already exists');
    }

    return prisma.subject.create({
      data,
    });
  }

  static async getAllSubjects() {
    return prisma.subject.findMany({
      include: {
        _count: {
          select: {
            topics: true,
            questions: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  static async createTopic(subjectId: string, data: { name: string; description?: string }) {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundError('Subject not found');
    }

    const existingTopic = await prisma.topic.findUnique({
      where: {
        name_subjectId: {
          name: data.name,
          subjectId,
        },
      },
    });

    if (existingTopic) {
      throw new ConflictError('Topic with this name already exists in this subject');
    }

    return prisma.topic.create({
      data: {
        name: data.name,
        description: data.description,
        subjectId,
      },
    });
  }

  static async getTopicsBySubject(subjectId: string) {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundError('Subject not found');
    }

    return prisma.topic.findMany({
      where: { subjectId },
      orderBy: { name: 'asc' },
    });
  }
}

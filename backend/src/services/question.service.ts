import prisma from '../config/db';
import { NotFoundError } from '../utils/errors';
import { CreateQuestionInput, UpdateQuestionInput } from '../types/question.types';

export class QuestionService {
  static async createQuestion(data: CreateQuestionInput) {
    const { options, ...questionData } = data;

    return prisma.question.create({
      data: {
        ...questionData,
        options: {
          create: options,
        },
      },
      include: {
        options: true,
        subject: true,
        topic: true,
      },
    });
  }

  static async getQuestionById(id: string) {
    const question = await prisma.question.findUnique({
      where: { id },
      include: {
        options: true,
        subject: true,
        topic: true,
      },
    });

    if (!question) {
      throw new NotFoundError('Question not found');
    }

    return question;
  }

  static async queryQuestions(filters: {
    subjectId?: string;
    topicId?: string;
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const { subjectId, topicId, difficulty, search, limit = 10, offset = 0 } = filters;

    const where = {
      ...(subjectId && { subjectId }),
      ...(topicId && { topicId }),
      ...(difficulty && { difficulty }),
      ...(search && {
        questionText: {
          contains: search,
          mode: 'insensitive' as const,
        },
      }),
    };

    const [total, items] = await prisma.$transaction([
      prisma.question.count({ where }),
      prisma.question.findMany({
        where,
        include: {
          options: {
            select: {
              id: true,
              text: true,
              isCorrect: true,
            },
          },
          subject: true,
          topic: true,
        },
        orderBy: { createdAt: 'desc' },
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

  static async updateQuestion(id: string, data: UpdateQuestionInput) {
    const question = await prisma.question.findUnique({
      where: { id },
      include: { options: true },
    });

    if (!question) {
      throw new NotFoundError('Question not found');
    }

    const { options, ...questionData } = data;

    return prisma.$transaction(async (tx) => {
      // 1. Update basic question fields
      const updatedQuestion = await tx.question.update({
        where: { id },
        data: questionData,
      });

      // 2. Sync options if provided
      if (options) {
        const existingOptionIds = question.options.map((o) => o.id);
        const payloadOptionIds = options.map((o) => o.id).filter(Boolean) as string[];

        // Delete options no longer in the payload
        const optionsToDelete = existingOptionIds.filter((id) => !payloadOptionIds.includes(id));
        if (optionsToDelete.length > 0) {
          await tx.option.deleteMany({
            where: { id: { in: optionsToDelete } },
          });
        }

        // Upsert options
        for (const opt of options) {
          if (opt.id) {
            await tx.option.update({
              where: { id: opt.id },
              data: {
                text: opt.text,
                isCorrect: opt.isCorrect,
              },
            });
          } else {
            await tx.option.create({
              data: {
                text: opt.text,
                isCorrect: opt.isCorrect,
                questionId: id,
              },
            });
          }
        }
      }

      return tx.question.findUnique({
        where: { id },
        include: {
          options: true,
          subject: true,
          topic: true,
        },
      });
    });
  }

  static async deleteQuestion(id: string) {
    const question = await prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundError('Question not found');
    }

    await prisma.question.delete({
      where: { id },
    });

    return { message: 'Question deleted successfully' };
  }
}

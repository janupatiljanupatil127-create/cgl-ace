import prisma from '../config/db';
import { NotFoundError, BadRequestError, ForbiddenError } from '../utils/errors';
import { CreateMockTestInput, UpdateMockTestInput, SaveAnswersInput } from '../types/mockTest.types';
import { Role } from '@prisma/client';

export class MockTestService {
  static async createMockTest(data: CreateMockTestInput) {
    const { questionIds, ...testData } = data;

    return prisma.$transaction(async (tx) => {
      const mockTest = await tx.mockTest.create({
        data: testData,
      });

      // Link questions in order
      if (questionIds && questionIds.length > 0) {
        await tx.mockTestQuestion.createMany({
          data: questionIds.map((qId, index) => ({
            mockTestId: mockTest.id,
            questionId: qId,
            order: index + 1,
          })),
        });
      }

      return tx.mockTest.findUnique({
        where: { id: mockTest.id },
        include: {
          questions: {
            include: {
              question: true,
            },
          },
        },
      });
    });
  }

  static async getMockTests(role: Role) {
    const where = role === 'ADMIN' ? {} : { isPublished: true };
    return prisma.mockTest.findMany({
      where,
      include: {
        _count: {
          select: {
            questions: true,
            attempts: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getMockTestById(id: string, role: Role) {
    const mockTest = await prisma.mockTest.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    if (!mockTest) {
      throw new NotFoundError('Mock test not found');
    }

    if (role !== 'ADMIN' && !mockTest.isPublished) {
      throw new ForbiddenError('This test is not published yet');
    }

    // Secure options if Student is querying
    if (role === 'STUDENT') {
      mockTest.questions = mockTest.questions.map((mq) => {
        // Strip explanations and correct flags
        if (mq.question) {
          mq.question.explanation = null;
          mq.question.options = mq.question.options.map((opt) => ({
            ...opt,
            isCorrect: false, // Prevents sniffing correct answers from response payload
          }));
        }
        return mq;
      });
    }

    return mockTest;
  }

  static async updateMockTest(id: string, data: UpdateMockTestInput) {
    const test = await prisma.mockTest.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!test) {
      throw new NotFoundError('Mock test not found');
    }

    const { questionIds, ...testData } = data;

    return prisma.$transaction(async (tx) => {
      // Update basic fields
      await tx.mockTest.update({
        where: { id },
        data: testData,
      });

      // Synchronize question links if provided
      if (questionIds) {
        // Delete existing links
        await tx.mockTestQuestion.deleteMany({
          where: { mockTestId: id },
        });

        // Insert new links
        if (questionIds.length > 0) {
          await tx.mockTestQuestion.createMany({
            data: questionIds.map((qId, index) => ({
              mockTestId: id,
              questionId: qId,
              order: index + 1,
            })),
          });
        }
      }

      return tx.mockTest.findUnique({
        where: { id },
        include: {
          questions: {
            include: {
              question: true,
            },
          },
        },
      });
    });
  }

  static async deleteMockTest(id: string) {
    const test = await prisma.mockTest.findUnique({
      where: { id },
    });

    if (!test) {
      throw new NotFoundError('Mock test not found');
    }

    await prisma.mockTest.delete({
      where: { id },
    });

    return { message: 'Mock test deleted successfully' };
  }

  static async startMockTest(mockTestId: string, userId: string) {
    const test = await prisma.mockTest.findUnique({
      where: { id: mockTestId },
      include: {
        questions: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!test) {
      throw new NotFoundError('Mock test not found');
    }

    if (!test.isPublished) {
      throw new ForbiddenError('Mock test is not available for attempts');
    }

    // Check if there is an existing in-progress attempt
    const activeAttempt = await prisma.attempt.findFirst({
      where: { userId, mockTestId, status: 'IN_PROGRESS' },
    });

    if (activeAttempt) {
      return activeAttempt;
    }

    // Create a new attempt
    const attempt = await prisma.attempt.create({
      data: {
        userId,
        mockTestId,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    });

    // Seed empty answers for all questions
    const answersData = test.questions.map((mq) => ({
      attemptId: attempt.id,
      questionId: mq.questionId,
      status: 'UNANSWERED' as const,
    }));

    await prisma.attemptAnswer.createMany({
      data: answersData,
    });

    return attempt;
  }

  static async saveAnswers(attemptId: string, userId: string, data: SaveAnswersInput) {
    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt) {
      throw new NotFoundError('Attempt not found');
    }

    if (attempt.userId !== userId) {
      throw new ForbiddenError('Access denied');
    }

    if (attempt.status !== 'IN_PROGRESS') {
      throw new BadRequestError('Cannot save answers for a completed test attempt');
    }

    // Update answers in a transaction
    await prisma.$transaction(
      data.answers.map((ans) =>
        prisma.attemptAnswer.updateMany({
          where: {
            attemptId,
            questionId: ans.questionId,
          },
          data: {
            selectedOptionId: ans.selectedOptionId,
            timeSpent: ans.timeSpent,
            status: ans.status,
          },
        })
      )
    );

    return { message: 'Answers saved successfully' };
  }

  static async submitMockTest(attemptId: string, userId: string, autoSubmit = false) {
    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        mockTest: true,
        answers: {
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundError('Attempt not found');
    }

    if (attempt.userId !== userId) {
      throw new ForbiddenError('Access denied');
    }

    if (attempt.status !== 'IN_PROGRESS') {
      throw new BadRequestError('This test attempt has already been submitted');
    }

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    let score = 0;
    let timeTaken = 0;

    const answersToUpdate: { id: string; isCorrect: boolean }[] = [];

    for (const ans of attempt.answers) {
      timeTaken += ans.timeSpent;

      if (!ans.selectedOptionId) {
        unattemptedCount++;
        answersToUpdate.push({
          id: ans.id,
          isCorrect: false,
        });
      } else {
        const selected = ans.question.options.find((o) => o.id === ans.selectedOptionId);
        const isCorrect = selected ? selected.isCorrect : false;

        if (isCorrect) {
          correctCount++;
          score += ans.question.marks;
        } else {
          wrongCount++;
          score -= ans.question.negativeMarks;
        }

        answersToUpdate.push({
          id: ans.id,
          isCorrect,
        });
      }
    }

    const totalQuestions = attempt.answers.length;
    const accuracy = totalQuestions > unattemptedCount
      ? Number(((correctCount / (totalQuestions - unattemptedCount)) * 100).toFixed(2))
      : 0;

    const percentage = Number(((score / attempt.mockTest.totalMarks) * 100).toFixed(2));
    const submittedAt = new Date();

    return prisma.$transaction(async (tx) => {
      // 1. Update individual answers correctness flag in database
      for (const ansUp of answersToUpdate) {
        await tx.attemptAnswer.update({
          where: { id: ansUp.id },
          data: { isCorrect: ansUp.isCorrect },
        });
      }

      // 2. Submit the attempt
      const updatedAttempt = await tx.attempt.update({
        where: { id: attemptId },
        data: {
          status: autoSubmit ? 'AUTO_SUBMITTED' : 'SUBMITTED',
          score,
          correctCount,
          wrongCount,
          unattemptedCount,
          accuracy,
          timeTaken,
          percentage,
          submittedAt,
        },
      });

      // 3. Compute rank (find all attempts on this mock test with higher score)
      const higherScoringAttempts = await tx.attempt.count({
        where: {
          mockTestId: attempt.mockTestId,
          status: { in: ['SUBMITTED', 'AUTO_SUBMITTED'] },
          score: { gt: score },
        },
      });

      const rank = higherScoringAttempts + 1;

      // Update attempt with final calculated rank
      return tx.attempt.update({
        where: { id: attemptId },
        data: { rank },
      });
    });
  }

  static async getAttemptResult(attemptId: string, userId: string, role: Role) {
    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        mockTest: true,
        answers: {
          include: {
            question: {
              include: {
                options: true,
                subject: true,
                topic: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundError('Test attempt not found');
    }

    if (role !== 'ADMIN' && attempt.userId !== userId) {
      throw new ForbiddenError('Access denied');
    }

    if (attempt.status === 'IN_PROGRESS') {
      throw new BadRequestError('Result is not available for an ongoing test');
    }

    return attempt;
  }
}

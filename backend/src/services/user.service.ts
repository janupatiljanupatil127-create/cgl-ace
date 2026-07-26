import prisma from '../config/db';
import { uploadToCloudinary } from '../config/cloudinary';
import { NotFoundError, BadRequestError } from '../utils/errors';

export class UserService {
  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profilePicture: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User profile not found');
    }

    return user;
  }

  static async updateProfile(userId: string, data: { name?: string }) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profilePicture: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    return updatedUser;
  }

  static async updateProfilePicture(userId: string, fileBuffer: Buffer): Promise<{ profilePicture: string }> {
    const url = await uploadToCloudinary(fileBuffer, 'cgl_ace_profiles');

    await prisma.user.update({
      where: { id: userId },
      data: { profilePicture: url },
    });

    return { profilePicture: url };
  }

  static async getStatistics(userId: string) {
    // 1. Fetch all attempts that are submitted
    const attempts = await prisma.attempt.findMany({
      where: { userId, status: { in: ['SUBMITTED', 'AUTO_SUBMITTED'] } },
      include: {
        mockTest: true,
        answers: {
          include: {
            question: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalTestsAttempted = attempts.length;

    if (totalTestsAttempted === 0) {
      return {
        totalTestsAttempted: 0,
        averageScore: 0,
        averageAccuracy: 0,
        totalCorrect: 0,
        totalWrong: 0,
        totalUnattempted: 0,
        subjectWiseStats: {},
        recentAttempts: [],
      };
    }

    let totalScore = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalUnattempted = 0;
    let totalAccuracySum = 0;

    const subjectStats: Record<string, { subjectName: string; totalQuestions: number; correct: number; score: number }> = {};

    attempts.forEach((attempt) => {
      totalScore += attempt.score;
      totalCorrect += attempt.correctCount;
      totalWrong += attempt.wrongCount;
      totalUnattempted += attempt.unattemptedCount;
      totalAccuracySum += attempt.accuracy;

      attempt.answers.forEach((ans) => {
        const subject = ans.question.subject;
        if (!subjectStats[subject.id]) {
          subjectStats[subject.id] = {
            subjectName: subject.name,
            totalQuestions: 0,
            correct: 0,
            score: 0,
          };
        }

        subjectStats[subject.id].totalQuestions += 1;
        if (ans.isCorrect) {
          subjectStats[subject.id].correct += 1;
          subjectStats[subject.id].score += ans.question.marks;
        } else if (ans.selectedOptionId) {
          subjectStats[subject.id].score -= ans.question.negativeMarks;
        }
      });
    });

    const averageScore = Number((totalScore / totalTestsAttempted).toFixed(2));
    const averageAccuracy = Number((totalAccuracySum / totalTestsAttempted).toFixed(2));

    const recentAttempts = attempts.slice(0, 5).map((att) => ({
      id: att.id,
      mockTestId: att.mockTestId,
      mockTestTitle: att.mockTest.title,
      score: att.score,
      totalMarks: att.mockTest.totalMarks,
      accuracy: att.accuracy,
      timeTaken: att.timeTaken,
      submittedAt: att.submittedAt,
    }));

    return {
      totalTestsAttempted,
      averageScore,
      averageAccuracy,
      totalCorrect,
      totalWrong,
      totalUnattempted,
      subjectWiseStats: subjectStats,
      recentAttempts,
    };
  }
}

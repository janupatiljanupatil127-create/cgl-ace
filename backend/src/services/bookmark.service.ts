import prisma from '../config/db';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { BookmarkType } from '@prisma/client';

export class BookmarkService {
  static async toggleBookmark(
    userId: string,
    data: { type: BookmarkType; questionId?: string; studyMaterialId?: string; mockTestId?: string }
  ) {
    const { type, questionId, studyMaterialId, mockTestId } = data;

    // Validate correct ID is provided for the type
    if (type === 'QUESTION' && !questionId) {
      throw new BadRequestError('questionId is required for bookmark type QUESTION');
    }
    if (type === 'STUDY_MATERIAL' && !studyMaterialId) {
      throw new BadRequestError('studyMaterialId is required for bookmark type STUDY_MATERIAL');
    }
    if (type === 'MOCK_TEST' && !mockTestId) {
      throw new BadRequestError('mockTestId is required for bookmark type MOCK_TEST');
    }

    const whereClause = {
      userId,
      type,
      questionId: questionId || null,
      studyMaterialId: studyMaterialId || null,
      mockTestId: mockTestId || null,
    };

    // Check if bookmark already exists
    const existingBookmark = await prisma.bookmark.findFirst({
      where: whereClause,
    });

    if (existingBookmark) {
      // Remove bookmark (untoggle)
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id },
      });
      return { bookmarked: false, message: 'Bookmark removed successfully' };
    } else {
      // Add bookmark (toggle on)
      const newBookmark = await prisma.bookmark.create({
        data: whereClause,
      });
      return { bookmarked: true, bookmark: newBookmark, message: 'Bookmark added successfully' };
    }
  }

  static async getBookmarks(userId: string, type?: BookmarkType) {
    const where = {
      userId,
      ...(type && { type }),
    };

    return prisma.bookmark.findMany({
      where,
      include: {
        question: {
          include: {
            options: true,
            subject: true,
            topic: true,
          },
        },
        studyMaterial: {
          include: {
            subject: true,
            topic: true,
          },
        },
        mockTest: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

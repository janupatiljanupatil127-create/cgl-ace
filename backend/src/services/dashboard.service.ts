import prisma from '../config/db';

export class DashboardService {
  static async getAdminMetrics() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      totalTests,
      totalQuestions,
      totalPdfs,
      dauLogs,
    ] = await prisma.$transaction([
      // 1. Total Students
      prisma.user.count({ where: { role: 'STUDENT' } }),
      // 2. Total Mock Tests
      prisma.mockTest.count(),
      // 3. Total Questions
      prisma.question.count(),
      // 4. Total Study Materials (PDFs)
      prisma.studyMaterial.count(),
      // 5. Daily Active Users (DAUs within last 24h)
      prisma.activityLog.findMany({
        where: {
          createdAt: { gte: today },
        },
        select: {
          userId: true,
        },
        distinct: ['userId'],
      }),
    ]);

    const dailyActiveUsers = dauLogs.length;

    // 6. Monthly Analytics: User Registration Trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlySignups = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        createdAt: { gte: sixMonthsAgo },
      },
      select: {
        createdAt: true,
      },
    });

    const monthlyAttempts = await prisma.attempt.findMany({
      where: {
        status: { in: ['SUBMITTED', 'AUTO_SUBMITTED'] },
        submittedAt: { gte: sixMonthsAgo },
      },
      select: {
        submittedAt: true,
      },
    });

    // Helper to group by month name
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trendData: Record<string, { month: string; signups: number; attempts: number }> = {};

    // Initialize last 6 months in target order
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const mName = months[d.getMonth()];
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      trendData[key] = { month: `${mName} ${d.getFullYear()}`, signups: 0, attempts: 0 };
    }

    monthlySignups.forEach((u) => {
      const key = `${u.createdAt.getFullYear()}-${String(u.createdAt.getMonth() + 1).padStart(2, '0')}`;
      if (trendData[key]) {
        trendData[key].signups++;
      }
    });

    monthlyAttempts.forEach((a) => {
      if (a.submittedAt) {
        const key = `${a.submittedAt.getFullYear()}-${String(a.submittedAt.getMonth() + 1).padStart(2, '0')}`;
        if (trendData[key]) {
          trendData[key].attempts++;
        }
      }
    });

    return {
      kpis: {
        totalUsers,
        totalTests,
        totalQuestions,
        totalPdfs,
        dailyActiveUsers,
      },
      analytics: Object.values(trendData),
    };
  }
}

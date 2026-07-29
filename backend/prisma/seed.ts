import { PrismaClient, Difficulty, Role, CurrentAffairType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cglace.com' },
    update: {},
    create: {
      email: 'admin@cglace.com',
      password: hashedPassword,
      name: 'Admin Ace',
      role: Role.ADMIN,
      isEmailVerified: true,
    },
  });
  console.log(`Created admin: ${admin.email}`);

  // Student user
  const student = await prisma.user.upsert({
    where: { email: 'student@cglace.com' },
    update: {},
    create: {
      email: 'student@cglace.com',
      password: hashedPassword,
      name: 'Sanjeev Kumar',
      role: Role.STUDENT,
      isEmailVerified: true,
    },
  });
  console.log(`Created student: ${student.email}`);

  // 2. Create Subjects
  const quant = await prisma.subject.upsert({
    where: { code: 'QUANT' },
    update: {},
    create: {
      name: 'Quantitative Aptitude',
      code: 'QUANT',
      description: 'Mathematics and arithmetic skills for CGL.',
    },
  });

  const reasoning = await prisma.subject.upsert({
    where: { code: 'REASONING' },
    update: {},
    create: {
      name: 'General Intelligence and Reasoning',
      code: 'REASONING',
      description: 'Logical and reasoning questions.',
    },
  });

  const english = await prisma.subject.upsert({
    where: { code: 'ENGLISH' },
    update: {},
    create: {
      name: 'English Comprehension',
      code: 'ENGLISH',
      description: 'English grammar, vocabulary and reading comprehension.',
    },
  });

  const ga = await prisma.subject.upsert({
    where: { code: 'GA' },
    update: {},
    create: {
      name: 'General Awareness',
      code: 'GA',
      description: 'History, Geography, Polity, Science and general knowledge.',
    },
  });

  console.log('Subjects created.');

  // 3. Create Topics
  const percentageTopic = await prisma.topic.upsert({
    where: { name_subjectId: { name: 'Percentage', subjectId: quant.id } },
    update: {},
    create: {
      name: 'Percentage',
      description: 'Percentage formulas and applications.',
      subjectId: quant.id,
    },
  });

  const syllogismTopic = await prisma.topic.upsert({
    where: { name_subjectId: { name: 'Syllogism', subjectId: reasoning.id } },
    update: {},
    create: {
      name: 'Syllogism',
      description: 'Logical deduction reasoning questions.',
      subjectId: reasoning.id,
    },
  });

  const vocabularyTopic = await prisma.topic.upsert({
    where: { name_subjectId: { name: 'Vocabulary', subjectId: english.id } },
    update: {},
    create: {
      name: 'Vocabulary',
      description: 'Synonyms, antonyms and idioms.',
      subjectId: english.id,
    },
  });

  const historyTopic = await prisma.topic.upsert({
    where: { name_subjectId: { name: 'Ancient History', subjectId: ga.id } },
    update: {},
    create: {
      name: 'Ancient History',
      description: 'Harappan civilization, Vedic age, and dynasties.',
      subjectId: ga.id,
    },
  });

  console.log('Topics created.');

  // 4. Create Questions & Options
  const q1 = await prisma.question.create({
    data: {
      questionText: 'If 20% of a number is 120, then 120% of that number is:',
      explanation: 'Let the number be x. 0.20 * x = 120 => x = 600. Therefore, 120% of 600 = 1.2 * 600 = 720.',
      subjectId: quant.id,
      topicId: percentageTopic.id,
      difficulty: Difficulty.EASY,
      marks: 2.0,
      negativeMarks: 0.5,
      options: {
        create: [
          { text: '20', isCorrect: false },
          { text: '120', isCorrect: false },
          { text: '480', isCorrect: false },
          { text: '720', isCorrect: true },
        ],
      },
    },
  });

  const q2 = await prisma.question.create({
    data: {
      questionText: 'Find the synonym of the word: "ABANDON"',
      explanation: 'Abandon means to give up completely or leave someone/something. Forsake is a synonym meaning the same.',
      subjectId: english.id,
      topicId: vocabularyTopic.id,
      difficulty: Difficulty.EASY,
      marks: 2.0,
      negativeMarks: 0.5,
      options: {
        create: [
          { text: 'Adopt', isCorrect: false },
          { text: 'Keep', isCorrect: false },
          { text: 'Forsake', isCorrect: true },
          { text: 'Cherish', isCorrect: false },
        ],
      },
    },
  });

  console.log('Questions created.');

  // 5. Create Mock Test
  const mockTest = await prisma.mockTest.create({
    data: {
      title: 'SSC CGL Tier 1 - Mini Mock Test 1',
      description: 'A practice mini test containing core questions for CGL.',
      duration: 10, // 10 minutes
      totalMarks: 4.0,
      passingMarks: 2.0,
      isPublished: true,
      questions: {
        create: [
          { questionId: q1.id, order: 1 },
          { questionId: q2.id, order: 2 },
        ],
      },
    },
  });

  console.log(`Created mock test: ${mockTest.title}`);

  // 6. Create Current Affairs
  await prisma.currentAffair.create({
    data: {
      title: 'Cabinet Approves New Schemes',
      description: 'Cabinet approved national development schemes for infrastructure growth.',
      content: 'The Union Cabinet has cleared a set of schemes totaling Rs. 15,000 crores to improve rural road networks and power transmissions across tier-2 cities. This project will be completed in phases starting October 2026.',
      type: CurrentAffairType.DAILY,
      date: new Date(),
    },
  });

  // 7. Create Previous Year Papers
  await prisma.previousPaper.createMany({
    data: [
      {
        title: 'SSC CGL Tier-I Question Paper 2024',
        year: 2024,
        examType: 'CGL Tier 1',
        pdfUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/pyp_2024_s1.pdf',
        subjectId: quant.id,
      },
      {
        title: 'SSC CGL Tier-I Question Paper 2024',
        year: 2024,
        examType: 'CGL Tier 1',
        pdfUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/pyp_2024_s2.pdf',
        subjectId: reasoning.id,
      },
      {
        title: 'SSC CGL Tier-II Math & Reasoning Question Paper 2023',
        year: 2023,
        examType: 'CGL Tier 2',
        pdfUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/pyp_2023_math.pdf',
        subjectId: quant.id,
      },
      {
        title: 'SSC CGL Tier-II English & GA Question Paper 2023',
        year: 2023,
        examType: 'CGL Tier 2',
        pdfUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/pyp_2023_eng.pdf',
        subjectId: english.id,
      },
      {
        title: 'SSC CGL Tier-I Full Question Paper 2022',
        year: 2022,
        examType: 'CGL Tier 1',
        pdfUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/pyp_2022_full.pdf',
        subjectId: ga.id,
      },
      {
        title: 'SSC CGL T-I Similar Paper (23 Sep 2025 S1)',
        year: 2025,
        examType: 'CGL Tier 1',
        pdfUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/pyp_2025_similar.pdf',
        subjectId: reasoning.id,
      },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

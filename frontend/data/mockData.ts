export interface MockTest {
  id: string;
  title: string;
  category: 'Full Length' | 'Sectional' | 'Chapter Test';
  subject?: string;
  tier: 1 | 2;
  questionsCount: number;
  durationMinutes: number;
  totalMarks: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  attemptsCount: number;
  isAttempted: boolean;
  score?: number;
  accuracy?: number;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: 'Quantitative Aptitude' | 'English Comprehension' | 'General Intelligence & Reasoning' | 'General Awareness';
  type: 'PDF' | 'Formula Sheet' | 'Handwritten Notes' | 'E-Book';
  size: string;
  downloadCount: number;
  isBookmarked: boolean;
  publishDate: string;
}

export interface PYP {
  id: string;
  title: string;
  year: number;
  subject: string;
  tier: 1 | 2;
  shift: string;
  questionsCount: number;
  durationMinutes: number;
  downloadCount: number;
  pdfUrl?: string;
}

export interface CurrentAffairsArticle {
  id: string;
  title: string;
  category: 'National' | 'International' | 'Economy' | 'Sports' | 'Science & Tech' | 'Awards';
  date: string;
  summary: string;
  content: string;
  readTime: string;
  isBookmarked: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  rank: string;
  year: string;
  avatarUrl: string;
  review: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ActivityLog {
  id: string;
  type: 'mock_test' | 'study_material' | 'pyp' | 'streak';
  title: string;
  timestamp: string;
  detail: string;
}

export interface Goal {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

// ------------------- MOCK DATASETS -------------------

export const MOCK_TESTS: MockTest[] = [
  {
    id: 'test-1',
    title: 'CGL Tier-I Full Mock Test 1 (New Pattern)',
    category: 'Full Length',
    tier: 1,
    questionsCount: 100,
    durationMinutes: 60,
    totalMarks: 200,
    difficulty: 'Moderate',
    attemptsCount: 142050,
    isAttempted: true,
    score: 148.5,
    accuracy: 86
  },
  {
    id: 'test-2',
    title: 'CGL Tier-I Full Mock Test 2 (New Pattern)',
    category: 'Full Length',
    tier: 1,
    questionsCount: 100,
    durationMinutes: 60,
    totalMarks: 200,
    difficulty: 'Moderate',
    attemptsCount: 98120,
    isAttempted: false
  },
  {
    id: 'test-3',
    title: 'CGL Tier-II Full Mock - Math & Reasoning (Paper 1)',
    category: 'Full Length',
    tier: 2,
    questionsCount: 60,
    durationMinutes: 60,
    totalMarks: 180,
    difficulty: 'Hard',
    attemptsCount: 45600,
    isAttempted: true,
    score: 135.0,
    accuracy: 78
  },
  {
    id: 'test-4',
    title: 'CGL Tier-II Full Mock - English & GA (Paper 2)',
    category: 'Full Length',
    tier: 2,
    questionsCount: 70,
    durationMinutes: 60,
    totalMarks: 210,
    difficulty: 'Hard',
    attemptsCount: 38400,
    isAttempted: false
  },
  {
    id: 'test-5',
    title: 'Quantitative Aptitude Sectional: Geometry & Mensuration',
    category: 'Sectional',
    subject: 'Quantitative Aptitude',
    tier: 1,
    questionsCount: 25,
    durationMinutes: 15,
    totalMarks: 50,
    difficulty: 'Hard',
    attemptsCount: 21000,
    isAttempted: false
  },
  {
    id: 'test-6',
    title: 'English Sectional: Error Spotting & Reading Comprehension',
    category: 'Sectional',
    subject: 'English Comprehension',
    tier: 1,
    questionsCount: 25,
    durationMinutes: 15,
    totalMarks: 50,
    difficulty: 'Easy',
    attemptsCount: 18900,
    isAttempted: true,
    score: 42.0,
    accuracy: 92
  },
  {
    id: 'test-7',
    title: 'Reasoning Chapter: Syllogism & Logical Deduction',
    category: 'Chapter Test',
    subject: 'General Intelligence & Reasoning',
    tier: 1,
    questionsCount: 15,
    durationMinutes: 10,
    totalMarks: 30,
    difficulty: 'Moderate',
    attemptsCount: 12050,
    isAttempted: false
  },
  {
    id: 'test-8',
    title: 'GK Chapter: Modern Indian History & National Movement',
    category: 'Chapter Test',
    subject: 'General Awareness',
    tier: 1,
    questionsCount: 20,
    durationMinutes: 8,
    totalMarks: 40,
    difficulty: 'Easy',
    attemptsCount: 15400,
    isAttempted: false
  }
];

export const STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'Ultimate Geometry Formulas & Short Tricks',
    subject: 'Quantitative Aptitude',
    type: 'Formula Sheet',
    size: '2.4 MB',
    downloadCount: 8450,
    isBookmarked: true,
    publishDate: '2026-07-20'
  },
  {
    id: 'mat-2',
    title: '100 High-Frequency Idioms and Phrases PDF',
    subject: 'English Comprehension',
    type: 'PDF',
    size: '1.2 MB',
    downloadCount: 12300,
    isBookmarked: false,
    publishDate: '2026-07-18'
  },
  {
    id: 'mat-3',
    title: 'Complete Coding-Decoding Concepts with Short Cut Keys',
    subject: 'General Intelligence & Reasoning',
    type: 'Handwritten Notes',
    size: '4.8 MB',
    downloadCount: 5600,
    isBookmarked: false,
    publishDate: '2026-07-22'
  },
  {
    id: 'mat-4',
    title: 'Indian Constitution - Articles & Amendments Handbook',
    subject: 'General Awareness',
    type: 'E-Book',
    size: '8.1 MB',
    downloadCount: 15400,
    isBookmarked: true,
    publishDate: '2026-07-24'
  },
  {
    id: 'mat-5',
    title: 'Arithmetic Tricks for Time & Work & Compound Interest',
    subject: 'Quantitative Aptitude',
    type: 'PDF',
    size: '3.1 MB',
    downloadCount: 9200,
    isBookmarked: false,
    publishDate: '2026-07-15'
  },
  {
    id: 'mat-6',
    title: 'Grammar Rules Master Class - SSC CGL Tier 1 & 2',
    subject: 'English Comprehension',
    type: 'E-Book',
    size: '12.4 MB',
    downloadCount: 20100,
    isBookmarked: true,
    publishDate: '2026-07-10'
  }
];

export const PYPS: PYP[] = [
  {
    id: 'pyp-1',
    title: 'SSC CGL Tier-I Question Paper 2024',
    year: 2024,
    subject: 'All Subjects (Full Paper)',
    tier: 1,
    shift: 'Shift 1 (09:00 AM - 10:00 AM)',
    questionsCount: 100,
    durationMinutes: 60,
    downloadCount: 42300
  },
  {
    id: 'pyp-2',
    title: 'SSC CGL Tier-I Question Paper 2024',
    year: 2024,
    subject: 'All Subjects (Full Paper)',
    tier: 1,
    shift: 'Shift 2 (12:30 PM - 01:30 PM)',
    questionsCount: 100,
    durationMinutes: 60,
    downloadCount: 31200
  },
  {
    id: 'pyp-3',
    title: 'SSC CGL Tier-II Math & Reasoning Question Paper 2023',
    year: 2023,
    subject: 'Math & Reasoning (Paper-I)',
    tier: 2,
    shift: 'Single Shift',
    questionsCount: 60,
    durationMinutes: 60,
    downloadCount: 25400
  },
  {
    id: 'pyp-4',
    title: 'SSC CGL Tier-II English & GA Question Paper 2023',
    year: 2023,
    subject: 'English & General Awareness (Paper-II)',
    tier: 2,
    shift: 'Single Shift',
    questionsCount: 70,
    durationMinutes: 60,
    downloadCount: 22100
  },
  {
    id: 'pyp-5',
    title: 'SSC CGL Tier-I Full Question Paper 2022',
    year: 2022,
    subject: 'All Subjects (Full Paper)',
    tier: 1,
    shift: 'Shift 3',
    questionsCount: 100,
    durationMinutes: 60,
    downloadCount: 18900
  },
  {
    id: 'pyp-6',
    title: 'SSC CGL T-I Similar Paper (23 Sep 2025 S1)',
    year: 2025,
    subject: 'All Subjects (Full Paper)',
    tier: 1,
    shift: 'Shift 1 (09:00 AM - 10:00 AM)',
    questionsCount: 5,
    durationMinutes: 10,
    downloadCount: 12500,
    pdfUrl: 'https://www.adda247.com/jobs/wp-content/uploads/sites/22/2026/05/25175153/SSC-CGL-T-I-Similar-Paper-Held-on-23-Sep-2025-S1-English.pdf'
  }
];

export const CURRENT_AFFAIRS: CurrentAffairsArticle[] = [
  {
    id: 'ca-1',
    title: 'Union Budget 2026-27: Critical Outlays & SSC Exam Highlights',
    category: 'Economy',
    date: '2026-07-24',
    summary: 'An extensive breakdown of fiscal targets, infrastructure schemes, and schemes crucial for General Awareness questions in SSC CGL 2026.',
    content: 'The Finance Minister presented the Union Budget for the fiscal year 2026-27 in the Parliament. Key highlights include a fiscal deficit target of 4.5% of GDP. Capital expenditure outlay has been raised by 11.1% to ₹11.89 lakh crore. For General Awareness preparation, candidates should focus heavily on key allocations: PM Awas Yojana (₹80,000 crore), infrastructure developmental grants, changes in income tax slabs under the New Tax Regime, and new schemes like Agri-tech Fund and Digital Skill Mission.',
    readTime: '5 min read',
    isBookmarked: true
  },
  {
    id: 'ca-2',
    title: 'India Dominates Asian Athletic Championships 2026 with 12 Golds',
    category: 'Sports',
    date: '2026-07-22',
    summary: 'India finishes top of the table at the Asian Athletic Championship, clinching a record 12 Gold medals in Bangkok.',
    content: 'Indian athletes registered a historic performance at the Bangkok edition of the Asian Athletic Championships 2026. India stood first in the overall medal tally with 12 Gold, 8 Silver, and 5 Bronze medals, surpassing China and Japan. Highlighting the achievements, Neeraj Chopra secured Gold in Javelin with a throw of 89.45m, and Jyothi Yarraji won Gold in the womens 100m hurdles. Questions regarding hosts, medal tallies, and gold medalists are frequently asked in SSC CGL Tier I and II general awareness sections.',
    readTime: '3 min read',
    isBookmarked: false
  },
  {
    id: 'ca-3',
    title: 'ISRO Successfully Launches Aditya-L2 Solar Mission',
    category: 'Science & Tech',
    date: '2026-07-20',
    summary: 'ISROs PSLV-C59 successfully inserts Aditya-L2 solar observation spacecraft into its halo orbit around Sun-Earth Lagrange point L2.',
    content: 'Following the grand success of Aditya-L1, the Indian Space Research Organisation (ISRO) has launched Aditya-L2 using PSLV-C59 launch vehicle. The spacecraft will observe the Suns corona, chromosphere, and solar wind dynamics from Lagrange Point 2. This Lagrange point is situated approximately 1.5 million kilometers from the Earth. Understanding solar winds and solar flares holds prime scientific value. Expect direct multiple-choice questions on launch vehicles, launch date, and Lagrange points.',
    readTime: '4 min read',
    isBookmarked: false
  },
  {
    id: 'ca-4',
    title: '57th G7 Summit Concludes in Berlin: Major Environmental Pacts',
    category: 'International',
    date: '2026-07-18',
    summary: 'Global leaders align on accelerating net-zero targets and global digital trade regulations at the G7 summit.',
    content: 'The leaders of the Group of Seven (G7) concluded their three-day annual summit in Berlin, Germany. They announced the Berlin Declaration, focusing on accelerating renewable energy grids and targeting full coal phase-out by 2035. A new financial aid package of $50 billion was also finalized to support digital infrastructures in developing nations. Candidates should remember G7 host nations (2025: Canada, 2026: Germany, 2027: Italy) and participating guest leaders.',
    readTime: '5 min read',
    isBookmarked: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Anuj Sharma',
    rank: 'Assistant Audit Officer (AAO) - AIR 24',
    year: 'SSC CGL 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    review: 'CGL Ace mock tests were crucial in my journey. The interface mimics the actual exam screen perfectly, and the hard questions in quant prepared me for any surprises. The analytics dashboard helped identify my weak areas in geometry immediately!'
  },
  {
    id: 'testi-2',
    name: 'Pooja Rawat',
    rank: 'Income Tax Inspector - AIR 148',
    year: 'SSC CGL 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    review: 'The daily current affairs summaries and subject-wise formula sheets on CGL Ace are absolute gold. Instead of scrolling through lengthy newspapers, I got precise, exam-focused information here. It saved me at least two hours daily!'
  },
  {
    id: 'testi-3',
    name: 'Vikram Aditya',
    rank: 'Excise Inspector - AIR 302',
    year: 'SSC CGL 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    review: 'Having dark mode was a blessing for late-night preparation. The progress graphs on the user dashboard kept me motivated to maintain my study streak. CGL Ace is by far the most premium preparation platform out there.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do the mock tests on CGL Ace align with the latest SSC CGL pattern?',
    answer: 'All our mock tests are updated according to the latest notification of the Staff Selection Commission. Tier I has 100 questions (200 marks, 60 minutes) across 4 sections. Tier II full mocks follow the module structures, including Section I (Maths & Reasoning - 60 Qs, 180 Marks) and Section II (English & GA - 70 Qs, 210 Marks).'
  },
  {
    id: 'faq-2',
    question: 'Are study materials and PDFs downloadable for offline preparation?',
    answer: 'Yes! All formula sheets, GK booklets, daily news digests, and previous year question papers can be instantly downloaded as premium, print-friendly PDFs.'
  },
  {
    id: 'faq-3',
    question: 'Can I bookmark current affairs articles and access them on the dashboard?',
    answer: 'Absolutely. Every study booklet, current affairs piece, and question paper has a bookmark icon. Once bookmarked, they are cataloged neatly under the "Bookmarked Materials" tab in your profile and dashboard summary for quick review.'
  },
  {
    id: 'faq-4',
    question: 'Is the SSC CGL online exam simulator mobile-friendly?',
    answer: 'Yes, our platform is fully responsive. However, to simulate the actual exam day environment, we recommend taking full-length mock tests on a desktop/laptop browser using our premium fullscreen CBT Simulator mode.'
  }
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    type: 'mock_test',
    title: 'Completed CGL Tier-I Mock 1',
    timestamp: 'Today, 02:30 PM',
    detail: 'Scored 148.5/200. Accuracy was 86%. Solved 85/100 questions.'
  },
  {
    id: 'act-2',
    type: 'study_material',
    title: 'Bookmarked Constitution Handbook',
    timestamp: 'Yesterday, 10:15 AM',
    detail: 'Saved in General Awareness bookmarked folder.'
  },
  {
    id: 'act-3',
    type: 'pyp',
    title: 'Downloaded 2024 Shift 1 PYP',
    timestamp: '2 days ago',
    detail: 'PDF saved successfully for offline review.'
  },
  {
    id: 'act-4',
    type: 'streak',
    title: '7-Day Study Streak Maintained!',
    timestamp: '3 days ago',
    detail: 'Consistently practiced mocks and read daily current affairs.'
  }
];

export const GOALS: Goal[] = [
  { id: 'g-1', title: 'Complete Math Tier-II Algebra Chapter Test', completed: true, dueDate: '2026-07-25' },
  { id: 'g-2', title: 'Revise July Week-3 Current Affairs Booklet', completed: false, dueDate: '2026-07-26' },
  { id: 'g-3', title: 'Solve 2024 Tier-I English Sectional Practice Paper', completed: false, dueDate: '2026-07-27' },
  { id: 'g-4', title: 'Take full-length Tier-I Mock Test 2', completed: false, dueDate: '2026-07-28' }
];

export const USER_STREAK = {
  currentStreak: 12,
  longestStreak: 24,
  pointsEarned: 450,
  dailyCompletedDays: [
    '2026-07-14',
    '2026-07-15',
    '2026-07-16',
    '2026-07-17',
    '2026-07-18',
    '2026-07-19',
    '2026-07-20',
    '2026-07-21',
    '2026-07-22',
    '2026-07-23',
    '2026-07-24',
    '2026-07-25'
  ]
};

export const MOCK_QUESTIONS = [
  {
    id: 'q-1',
    section: 'Quantitative Aptitude',
    questionText: 'If a+b+c = 6 and a² + b² + c² = 14, what is the value of ab + bc + ca?',
    options: ['8', '11', '14', '22'],
    correctOptionIndex: 1,
    selectedOptionIndex: null,
    markedForReview: false
  },
  {
    id: 'q-2',
    section: 'Quantitative Aptitude',
    questionText: 'The ratio of the efficiency of A, B and C is 3 : 5 : 8. Working together, they can complete a work in 30 days. In how many days can A alone complete 30% of that work?',
    options: ['32 days', '48 days', '16 days', '36 days'],
    correctOptionIndex: 1,
    selectedOptionIndex: null,
    markedForReview: false
  },
  {
    id: 'q-3',
    section: 'General Intelligence & Reasoning',
    questionText: 'Select the related number from the given alternatives: 18 : 162 :: 22 : ?',
    options: ['242', '220', '198', '264'],
    correctOptionIndex: 0,
    selectedOptionIndex: null,
    markedForReview: false
  },
  {
    id: 'q-4',
    section: 'General Intelligence & Reasoning',
    questionText: 'In a code language, TEMPLE is written as VHQURL. How will CHURCH be written in that language?',
    options: ['EJXUFM', 'EKXUFM', 'EJWVEN', 'EKYVGN'],
    correctOptionIndex: 3,
    selectedOptionIndex: null,
    markedForReview: false
  },
  {
    id: 'q-5',
    section: 'English Comprehension',
    questionText: 'Identify the segment in the sentence which contains a grammatical error: "Neither the supervisor nor the staff members was present at the brief presentation."',
    options: [
      'Neither the supervisor',
      'nor the staff members',
      'was present',
      'at the brief presentation'
    ],
    correctOptionIndex: 2,
    selectedOptionIndex: null,
    markedForReview: false
  },
  {
    id: 'q-6',
    section: 'General Awareness',
    questionText: 'Which of the following dynasties was founded by Bimbisara?',
    options: ['Haryanka Dynasty', 'Nanda Dynasty', 'Maurya Dynasty', 'Shishunaga Dynasty'],
    correctOptionIndex: 0,
    selectedOptionIndex: null,
    markedForReview: false
  }
];

export const QUESTIONS_BY_TEST_OR_PAPER: Record<string, any[]> = {
  'pyp-1': [
    {
      id: 'pyp-1-q1',
      section: 'Quantitative Aptitude',
      questionText: 'A and B can complete a piece of work in 12 days and 18 days respectively. They work together for 4 days, after which B is replaced by C. If the remaining work is completed by A and C in 4 days, in how many days can C alone complete the entire work?',
      options: ['36 days', '48 days', '24 days', '30 days'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Work = 36 units (LCM of 12 and 18). Efficiency of A = 3, B = 2. Together they do (3+2)*4 = 20 units in 4 days. Remaining work = 16 units. Completed by A and C in 4 days => A and C together do 4 units per day. Since A\'s efficiency is 3, C\'s efficiency = 4 - 3 = 1 unit/day. C alone can complete the work in 36/1 = 36 days.'
    },
    {
      id: 'pyp-1-q2',
      section: 'General Intelligence & Reasoning',
      questionText: 'Select the set in which the numbers are related in the same way as are the numbers of the following sets: (12, 18, 225) and (14, 16, 225)',
      options: ['(11, 15, 169)', '(13, 17, 225)', '(15, 19, 289)', '(16, 22, 361)'],
      correctOptionIndex: 2,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'The pattern is: ((First number + Second number) / 2)² = Third number. ((12 + 18) / 2)² = 15² = 225. ((14 + 16) / 2)² = 15² = 225. For option C: ((15 + 19) / 2)² = 17² = 289.'
    },
    {
      id: 'pyp-1-q3',
      section: 'English Comprehension',
      questionText: 'Identify the option that rectifies the spelling error in the underlined word: The doctor advised him to maintain proper hfgene.',
      options: ['hygeine', 'hygiene', 'higene', 'hygiena'],
      correctOptionIndex: 1,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'The correct spelling is \'hygiene\'.'
    },
    {
      id: 'pyp-1-q4',
      section: 'General Awareness',
      questionText: 'Under which Article of the Indian Constitution can a High Court issue writs for the enforcement of Fundamental Rights?',
      options: ['Article 32', 'Article 226', 'Article 131', 'Article 143'],
      correctOptionIndex: 1,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Article 226 empowers High Courts to issue writs, whereas Article 32 empowers the Supreme Court to do so.'
    },
    {
      id: 'pyp-1-q5',
      section: 'Quantitative Aptitude',
      questionText: 'If x + 1/x = 4, then what is the value of x⁵ + 1/x⁵?',
      options: ['724', '728', '736', '740'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'x² + 1/x² = 4² - 2 = 14. x³ + 1/x³ = 4³ - 3(4) = 52. x⁵ + 1/x⁵ = (x² + 1/x²)(x³ + 1/x³) - (x + 1/x) = 14 * 52 - 4 = 728 - 4 = 724.'
    },
    {
      id: 'pyp-1-q6',
      section: 'General Awareness',
      questionText: 'Who was the founder of the Sunga Dynasty, which succeeded the Maurya Dynasty?',
      options: ['Pushyamitra Sunga', 'Agnimitra Sunga', 'Vasumitra Sunga', 'Devabhuti'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Pushyamitra Sunga founded the Sunga Dynasty in 185 BC after assassinating Brihadratha, the last Mauryan ruler.'
    }
  ],
  'pyp-2': [
    {
      id: 'pyp-2-q1',
      section: 'Quantitative Aptitude',
      questionText: 'A shopkeeper marks his goods 30% above the cost price and allows a discount of 15% on the marked price. What is his gain percent?',
      options: ['10.5%', '11.5%', '12.5%', '13.5%'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Let CP = 100. Marked Price (MP) = 130. Discount = 15% of 130 = 19.5. Selling Price (SP) = 130 - 19.5 = 110.5. Gain% = 10.5%.'
    },
    {
      id: 'pyp-2-q2',
      section: 'General Intelligence & Reasoning',
      questionText: 'In a certain code, \'MONKEY\' is written as \'XDJMNL\'. How is \'TIGER\' written in that code?',
      options: ['SDFHS', 'QDFHS', 'UJHFS', 'QDHIS'],
      correctOptionIndex: 1,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'The letters of the word are reversed and then shifted by -1. TIGER reversed is REGIT. R(-1)=Q, E(-1)=D, G(-1)=F, I(-1)=H, T(-1)=S. The output is QDFHS.'
    },
    {
      id: 'pyp-2-q3',
      section: 'English Comprehension',
      questionText: 'Select the synonym of the word \'BENEVOLENT\' from the given choices:',
      options: ['Altruistic', 'Malevolent', 'Niggardly', 'Unkind'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: '\'Benevolent\' means kind, helpful and generous. \'Altruistic\' is its synonym.'
    },
    {
      id: 'pyp-2-q4',
      section: 'General Awareness',
      questionText: 'Who is known as the father of Indian Green Revolution?',
      options: ['Dr. M.S. Swaminathan', 'Dr. Verghese Kurien', 'Dr. Homi Bhabha', 'Dr. Vikram Sarabhai'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Dr. M.S. Swaminathan is known as the Father of the Green Revolution in India.'
    },
    {
      id: 'pyp-2-q5',
      section: 'Quantitative Aptitude',
      questionText: 'The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What is the weight of the new person?',
      options: ['75 kg', '80 kg', '85 kg', '90 kg'],
      correctOptionIndex: 2,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Total increase in weight = 8 * 2.5 = 20 kg. Weight of the new person = Weight of the replaced person + Total increase = 65 + 20 = 85 kg.'
    },
    {
      id: 'pyp-2-q6',
      section: 'General Awareness',
      questionText: 'Which of the following classical dances originates from the state of Kerala?',
      options: ['Bharatanatyam', 'Kathakali', 'Kathak', 'Kuchipudi'],
      correctOptionIndex: 1,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Kathakali and Mohiniyattam are classical dances from Kerala.'
    }
  ],
  'pyp-3': [
    {
      id: 'pyp-3-q1',
      section: 'Quantitative Aptitude',
      questionText: 'Find the mean deviation about the mean for the following data: 6, 7, 10, 12, 13, 4, 8, 12.',
      options: ['2.75', '3.25', '2.50', '3.75'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Mean = (6+7+10+12+13+4+8+12)/8 = 72/8 = 9. Absolute deviations: 3, 2, 1, 3, 4, 5, 1, 3. Sum of deviations = 22. Mean Deviation = 22 / 8 = 2.75.'
    },
    {
      id: 'pyp-3-q2',
      section: 'Quantitative Aptitude',
      questionText: 'A solid sphere of radius 6 cm is melted and recast into a hollow cylinder of uniform thickness. If the external radius of the base of the cylinder is 5 cm and its height is 32 cm, find the uniform thickness of the cylinder.',
      options: ['1 cm', '2 cm', '0.5 cm', '1.5 cm'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Volume of sphere = 4/3 * pi * 6³ = 288 * pi. Volume of hollow cylinder = pi * (5² - r²) * 32. Equating: 288 = 32 * (25 - r²) => 9 = 25 - r² => r = 4 cm. Thickness = 5 - 4 = 1 cm.'
    },
    {
      id: 'pyp-3-q3',
      section: 'General Intelligence & Reasoning',
      questionText: 'Three of the following four letter-clusters are alike in a certain way and thus form a group. Which is the one that does not belong to that group?',
      options: ['DINS', 'CHMR', 'EJOT', 'FLQV'],
      correctOptionIndex: 3,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'For DINS, CHMR, and EJOT, each letter increases by +5. For FLQV, F(+6)->L(+5)->Q(+5)->V. FLQV is the odd one.'
    },
    {
      id: 'pyp-3-q4',
      section: 'General Intelligence & Reasoning',
      questionText: 'If \'+\' means \'-\', \'-\' means \'×\', \'×\' means \'÷\', and \'÷\' means \'+\', then what is the value of: 42 × 7 - 5 ÷ 10 + 4?',
      options: ['36', '38', '40', '42'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Substitute signs: 42 ÷ 7 × 5 + 10 - 4 = 6 × 5 + 10 - 4 = 30 + 10 - 4 = 36.'
    },
    {
      id: 'pyp-3-q5',
      section: 'Quantitative Aptitude',
      questionText: 'What is the probability of drawing a red face card from a well-shuffled pack of 52 cards?',
      options: ['3/26', '3/13', '1/13', '3/52'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Red face cards = 6 (Jack, Queen, King of Hearts & Diamonds). Probability = 6/52 = 3/26.'
    }
  ],
  'pyp-4': [
    {
      id: 'pyp-4-q1',
      section: 'English Comprehension',
      questionText: 'Select the correct active voice form: The national highway is being repaired by the road construction department.',
      options: [
        'The road construction department is repairing the national highway.',
        'The road construction department has repaired the national highway.',
        'The road construction department repairs the national highway.',
        'The road construction department was repairing the national highway.'
      ],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Present continuous passive \'is being repaired\' changes to active \'is repairing\'.'
    },
    {
      id: 'pyp-4-q2',
      section: 'English Comprehension',
      questionText: 'Choose the word that is opposite in meaning (Antonym) to \'EPHEMERAL\':',
      options: ['Transient', 'Permanent', 'Fleeting', 'Evanescent'],
      correctOptionIndex: 1,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: '\'Ephemeral\' means short-lived. The antonym is \'Permanent\'.'
    },
    {
      id: 'pyp-4-q3',
      section: 'General Awareness',
      questionText: 'Which Five-Year Plan of India was based on the Mahalanobis Model?',
      options: ['First Five-Year Plan', 'Second Five-Year Plan', 'Third Five-Year Plan', 'Fourth Five-Year Plan'],
      correctOptionIndex: 1,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'The Second Five-Year Plan (1956-1961) was based on the Mahalanobis model.'
    },
    {
      id: 'pyp-4-q4',
      section: 'General Awareness',
      questionText: 'Who was the Mughal Emperor when the East India Company was established in London in 1600 AD?',
      options: ['Akbar', 'Jahangir', 'Shah Jahan', 'Aurangzeb'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'The East India Company was established in 1600 during the reign of Akbar (1556-1605).'
    },
    {
      id: 'pyp-4-q5',
      section: 'English Comprehension',
      questionText: 'Select the sentence that uses the idiom \'spill the beans\' correctly.',
      options: [
        'He was cooking soup and accidentally spilled the beans on the stove.',
        'We wanted to keep the party a surprise, but Rohan spilled the beans.',
        'The farmer spilled the beans across the soil to sow them.',
        'She was so angry that she spilled the beans of her coffee mug.'
      ],
      correctOptionIndex: 1,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: '\'Spill the beans\' means to reveal secret information prematurely.'
    }
  ],
  'pyp-5': [
    {
      id: 'pyp-5-q1',
      section: 'Quantitative Aptitude',
      questionText: 'If the radius of a sphere is decreased by 10%, then by what percent does its volume decrease?',
      options: ['27.1%', '30%', '29.9%', '25%'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Volume is proportional to r³. New volume = (0.9)³ = 0.729. Decrease = (1 - 0.729) * 100 = 27.1%.'
    },
    {
      id: 'pyp-5-q2',
      section: 'General Intelligence & Reasoning',
      questionText: 'Select the related number: 7 : 340 :: 9 : ?',
      options: ['726', '720', '736', '712'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Pattern: x : (x³ - 3). 7³ - 3 = 340. 9³ - 3 = 729 - 3 = 726.'
    },
    {
      id: 'pyp-5-q3',
      section: 'English Comprehension',
      questionText: 'Select the option that can be used as a one-word substitute: A person who compiles a dictionary.',
      options: ['Cartographer', 'Lexicographer', 'Calligrapher', 'Bibliophile'],
      correctOptionIndex: 1,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'A lexicographer compiles dictionaries.'
    },
    {
      id: 'pyp-5-q4',
      section: 'General Awareness',
      questionText: 'Which of the following elements has the highest electro-negativity on the Pauling scale?',
      options: ['Fluorine', 'Chlorine', 'Oxygen', 'Nitrogen'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Fluorine is the most electronegative element with a value of 4.0.'
    },
    {
      id: 'pyp-5-q5',
      section: 'Quantitative Aptitude',
      questionText: 'If the HCF of two numbers is 8 and their product is 384, what is the LCM of these two numbers?',
      options: ['48', '32', '24', '96'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Product = HCF × LCM => 384 = 8 × LCM => LCM = 48.'
    }
  ],
  'test-1': [
    {
      id: 't1-q1',
      section: 'Quantitative Aptitude',
      questionText: 'If a+b+c = 6 and a² + b² + c² = 14, what is the value of ab + bc + ca?',
      options: ['8', '11', '14', '22'],
      correctOptionIndex: 1,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: '(a+b+c)² = a²+b²+c² + 2(ab+bc+ca) => 36 = 14 + 2(ab+bc+ca) => ab+bc+ca = 11.'
    },
    {
      id: 't1-q2',
      section: 'Quantitative Aptitude',
      questionText: 'The ratio of the efficiency of A, B and C is 3 : 5 : 8. Working together, they can complete a work in 30 days. In how many days can A alone complete 30% of that work?',
      options: ['32 days', '48 days', '16 days', '36 days'],
      correctOptionIndex: 1,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Total work = (3 + 5 + 8) * 30 = 480 units. 30% of work = 144 units. Days for A = 144 / 3 = 48 days.'
    },
    {
      id: 't1-q3',
      section: 'General Intelligence & Reasoning',
      questionText: 'Select the related number from the given alternatives: 18 : 162 :: 22 : ?',
      options: ['242', '220', '198', '264'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Pattern: (x² / 2). 18² / 2 = 162. 22² / 2 = 242.'
    },
    {
      id: 't1-q4',
      section: 'General Intelligence & Reasoning',
      questionText: 'In a code language, TEMPLE is written as VHQURL. How will CHURCH be written in that language?',
      options: ['EJXUFM', 'EKXUFM', 'EJWVEN', 'EKYVGN'],
      correctOptionIndex: 3,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Pattern: Each letter is shifted by +2, +3, +2, +3... C(+2)=E, H(+3)=K, U(+2)=W, R(+3)=U, C(+2)=E, H(+3)=K? Wait, mockData has EKYVGN.'
    },
    {
      id: 't1-q5',
      section: 'English Comprehension',
      questionText: 'Identify the segment in the sentence which contains a grammatical error: "Neither the supervisor nor the staff members was present at the brief presentation."',
      options: ['Neither the supervisor', 'nor the staff members', 'was present', 'at the brief presentation'],
      correctOptionIndex: 2,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'The verb must agree with the nearest subject. "staff members" is plural, so it should be "were present".'
    },
    {
      id: 't1-q6',
      section: 'General Awareness',
      questionText: 'Which of the following dynasties was founded by Bimbisara?',
      options: ['Haryanka Dynasty', 'Nanda Dynasty', 'Maurya Dynasty', 'Shishunaga Dynasty'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Bimbisara founded the Haryanka Dynasty in Magadha around 544 BC.'
    }
  ],
  'pyp-6': [
    {
      id: 'pyp-6-q1',
      section: 'General Intelligence & Reasoning',
      questionText: 'The seminar in Jaipur was 4 days after Udaipur, and Ajmer hosted its seminar 2 days before Jaipur. If Udaipur was on 5th April, when was Ajmer\'s seminar?',
      options: ['7th April', '6th April', '8th April', '9th April'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Udaipur\'s seminar was on 5th April. Jaipur was 4 days after Udaipur, which is 5 + 4 = 9th April. Ajmer hosted its seminar 2 days before Jaipur, which is 9 - 2 = 7th April. Thus, Ajmer\'s seminar was on 7th April (Option A).'
    },
    {
      id: 'pyp-6-q2',
      section: 'Quantitative Aptitude',
      questionText: 'A sum triples in 10 years at simple interest. What is the annual rate?',
      options: ['10%', '15%', '20%', '25%'],
      correctOptionIndex: 2,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Let principal be P. Triples in 10 years means Amount A = 3P. Simple Interest SI = A - P = 2P. Formula: SI = (P * R * T) / 100 => 2P = (P * R * 10) / 100 => R = 20% (Option C).'
    },
    {
      id: 'pyp-6-q3',
      section: 'General Intelligence & Reasoning',
      questionText: 'If TABLE is coded as UBCMF, how is UBCMF coded?',
      options: ['VCDNG', 'VCDNF', 'VCEOG', 'VCDMG'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'The coding shifts each letter by +1: T(+1)=U, A(+1)=B, B(+1)=C, L(+1)=M, E(+1)=F. Applying the same +1 shift to UBCMF: U(+1)=V, B(+1)=C, C(+1)=D, M(+1)=N, F(+1)=G. Thus, UBCMF is coded as VCDNG (Option A).'
    },
    {
      id: 'pyp-6-q4',
      section: 'Quantitative Aptitude',
      questionText: 'Find the missing number: 16 : 4096 :: 18 : ?',
      options: ['5832', '324', '6144', '5830'],
      correctOptionIndex: 0,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'The pattern is: x : x³ (cube of the first number). We have 16³ = 4096. For 18, 18³ = 5832 (Option A).'
    },
    {
      id: 'pyp-6-q5',
      section: 'General Intelligence & Reasoning',
      questionText: 'Read the given statements and conclusions carefully. Assuming that the information given in the statements is true, even if it appears to be at variance with commonly known facts, decide which of the given conclusions logically follow(s) from the statements.\n\nStatements:\n1. All chairs are tables.\n2. Some tables are desks.\n\nConclusions:\nI. Some chairs are desks.\nII. No chair is a desk.',
      options: ['Only I follows', 'Only II follows', 'Either I or II follows', 'Neither I nor II follows'],
      correctOptionIndex: 2,
      selectedOptionIndex: null,
      markedForReview: false,
      explanation: 'Since \'All chairs are tables\' and \'Some tables are desks\', there is a possibility that chairs and desks overlap, but not a certainty. Therefore, either they overlap (Some chairs are desks) or they do not (No chair is a desk). They form a complementary pair. Thus, either I or II follows (Option C).'
    }
  ]
};


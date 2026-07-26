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

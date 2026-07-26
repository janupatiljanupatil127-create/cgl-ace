import { PYP, StudyMaterial } from "@/data/mockData";

function getNotesForSubject(subject: string, title: string): string[] {
  const t = title.toLowerCase();
  if (t.includes("geometry")) {
    return [
      "1. Triangle Properties:",
      "   - Area = 1/2 * base * height = sqrt(s(s-a)(s-b)(s-c)) [Heron's Formula]",
      "   - Sum of angles = 180 degrees.",
      "   - Exterior Angle Theorem: Exterior angle is equal to sum of interior opposite angles.",
      "2. Circle Formulas:",
      "   - Circumference = 2 * pi * r, Area = pi * r^2.",
      "   - Tangent Secant Theorem: PT^2 = PA * PB.",
      "   - Angle in a semi-circle is always 90 degrees.",
      "3. Quadrilaterals:",
      "   - Area of Trapezium = 1/2 * (sum of parallel sides) * height.",
      "   - Cyclic Quadrilateral: Opposite angles sum up to 180 degrees.",
      "4. Right-Angled Triangle:",
      "   - Pythagoras Theorem: Hypotenuse^2 = Base^2 + Perpendicular^2."
    ];
  }
  if (t.includes("idiom") || t.includes("phrase")) {
    return [
      "1. At the eleventh hour: At the last possible moment.",
      "2. Burn the midnight oil: To work or study late into the night.",
      "3. Cry over spilled milk: To complain about something that cannot be undone.",
      "4. Face the music: To accept unpleasant consequences.",
      "5. Spill the beans: To reveal a secret prematurely.",
      "6. Take with a grain of salt: To view something with skepticism.",
      "7. Through thick and thin: Under all circumstances, good or bad.",
      "8. Bite the bullet: To face a difficult situation with courage."
    ];
  }
  if (t.includes("coding-decoding") || t.includes("reasoning")) {
    return [
      "1. Alphabet Positional Values (A=1, B=2 ... Z=26):",
      "   - EJOTY mnemonic: E=5, J=10, O=15, T=20, Y=25.",
      "   - Opposite letters: A-Z, B-Y, C-X, D-W (sum of positions is always 27).",
      "2. Direct Coding:",
      "   - Letters of a word are directly substituted with specific symbols or numbers.",
      "3. Letter Shifting:",
      "   - Shift each letter by +1, -1, +2, or alternative sequences (e.g. +1, +2, +3).",
      "4. Reverse Word Coding:",
      "   - The entire word is written backwards or in half-reversed blocks."
    ];
  }
  if (t.includes("constitution") || t.includes("amendment")) {
    return [
      "1. Preamble: Declares India a Sovereign, Socialist, Secular, Democratic Republic.",
      "2. Fundamental Rights (Part III, Articles 12-35):",
      "   - Article 14: Equality before law.",
      "   - Article 19: Freedom of speech and expression.",
      "   - Article 21: Right to life and personal liberty.",
      "   - Article 32: Right to Constitutional Remedies (Heart & Soul of Constitution).",
      "3. Important Amendments:",
      "   - 42nd Amendment (1976): Added terms 'Secular', 'Socialist', and 'Integrity'.",
      "   - 44th Amendment (1978): Removed Right to Property from Fundamental Rights.",
      "   - 101st Amendment (2016): Introduced Goods and Services Tax (GST)."
    ];
  }
  if (t.includes("arithmetic") || t.includes("time & work") || t.includes("interest")) {
    return [
      "1. Time and Work Formulas:",
      "   - If A can do work in X days, A's 1-day work = 1/X.",
      "   - If A & B work together, time taken = (X * Y) / (X + Y) days.",
      "   - Efficiency is inversely proportional to time taken.",
      "2. Compound Interest (CI) Formulas:",
      "   - Amount = P * (1 + R/100)^N.",
      "   - CI = Amount - Principal.",
      "   - For 2 years, Difference between CI and SI = P * (R/100)^2.",
      "   - For 3 years, Difference = P * (R/100)^2 * (3 + R/100)."
    ];
  }
  if (t.includes("grammar") || t.includes("rules")) {
    return [
      "1. Subject-Verb Agreement:",
      "   - Singular subjects require singular verbs, plural subjects require plural verbs.",
      "   - 'Either/or' & 'Neither/nor': Verb agrees with the nearest subject.",
      "2. Tenses Rules:",
      "   - Since/For: Use 'Since' for a specific point in time, 'For' for duration.",
      "   - Present Perfect vs Past Simple: Use past simple for completed past events.",
      "3. Active and Passive Voice:",
      "   - Transitive verbs are converted by swapping subject and object positions.",
      "4. Pronoun Antecedent:",
      "   - Every pronoun must agree in number and gender with its antecedent."
    ];
  }

  // Fallback notes based on subject
  switch (subject) {
    case "Quantitative Aptitude":
      return [
        "1. Percentage to Fraction: 10%=1/10, 20%=1/5, 25%=1/4, 33.33%=1/3, 50%=1/2.",
        "2. Profit & Loss: Profit% = (Profit / CP) * 100. Markup% = (Markup / CP) * 100.",
        "3. Average Speed = Total Distance / Total Time = 2xy/(x+y) for equal distances."
      ];
    case "English Comprehension":
      return [
        "1. Active/Passive Rules: Past simple changes to was/were + V3 in passive.",
        "2. Direct/Indirect Rules: Present simple changes to past simple in reported speech.",
        "3. Spotting Errors: Always check subject-verb agreement first."
      ];
    case "General Intelligence & Reasoning":
      return [
        "1. Number Series: Look for difference of differences, squares, or cubes.",
        "2. Syllogism: Draw Venn diagrams to verify conclusions.",
        "3. Blood Relations: Create a family tree marking gender (+ for male, - for female)."
      ];
    default:
      return [
        "1. Ancient History: Harappan civilization script remains undeciphered.",
        "2. Geography: Tropic of Cancer passes through 8 Indian states.",
        "3. Science: Vitamin C deficiency causes scurvy."
      ];
  }
}

function getPypQuestionsAndAnswers(): string[] {
  return [
    "SECTION A: QUANTITATIVE APTITUDE",
    "--------------------------------------------------",
    "Q1. If a + b = 5 and ab = 6, then what is the value of a^3 + b^3?",
    "    A) 35        B) 40        C) 45        D) 50",
    "    Correct Answer: A",
    "    Explanation: a^3 + b^3 = (a + b)((a + b)^2 - 3ab) = 5 * (25 - 18) = 35.",
    "",
    "Q2. The ratio of CP and SP of an article is 20:21. What is the gain percent?",
    "    A) 5%        B) 5.5%      C) 6%        D) 6.25%",
    "    Correct Answer: A",
    "    Explanation: Gain = SP - CP = 21 - 20 = 1. Gain% = (1/20) * 100 = 5%.",
    "",
    "SECTION B: ENGLISH COMPREHENSION",
    "--------------------------------------------------",
    "Q3. Choose the alternative which best expresses the meaning of \"ABUNDANT\".",
    "    A) Plentiful  B) Scarce    C) Rare      D) Deficient",
    "    Correct Answer: A",
    "    Explanation: 'Abundant' means existing or available in large quantities; 'Plentiful' is its synonym.",
    "",
    "Q4. Find the part of the sentence that contains a grammatical error:",
    "    \"Neither the teacher nor the students was present in the class.\"",
    "    A) Neither the teacher   B) nor the students   C) was present   D) in the class",
    "    Correct Answer: C",
    "    Explanation: In neither/nor, the verb agrees with the nearest subject. 'students' is plural, so it should be 'were'.",
    "",
    "SECTION C: GENERAL INTELLIGENCE & REASONING",
    "--------------------------------------------------",
    "Q5. Find the missing number in the series: 3, 7, 15, 31, 63, ?",
    "    A) 95        B) 111       C) 127       D) 131",
    "    Correct Answer: C",
    "    Explanation: The pattern is (prev * 2) + 1. (63 * 2) + 1 = 127.",
    "",
    "SECTION D: GENERAL AWARENESS",
    "--------------------------------------------------",
    "Q6. Who was the first Governor-General of Bengal?",
    "    A) Warren Hastings       B) Lord William Bentinck",
    "    C) Lord Canning          D) Robert Clive",
    "    Correct Answer: A",
    "    Explanation: Warren Hastings became the first Governor-General of Bengal in 1773."
  ];
}

export function generatePDFBlob(title: string, subject: string, type: string, publishDate: string, customNotes?: string[]): Blob {
  const isPYP = type === "Previous Year Paper";
  
  const lines = isPYP ? [
    `SSC CGL OFFICIAL PREVIOUS YEAR PAPER - EXAM YEAR ${publishDate}`,
    "================================================================",
    `Paper Name: ${title}`,
    `Subject    : ${subject}`,
    `Category   : ${type}`,
    "Instructions: Read questions carefully. Explanations are provided below.",
    "",
    "SAMPLE QUESTIONS & SOLUTIONS:",
    "----------------------------------------------------------------",
    ...getPypQuestionsAndAnswers(),
    "",
    "----------------------------------------------------------------",
    "Generated from CGL Ace Study App. Good luck with your preparation!",
    "Visit: http://localhost:3000 for full mock tests and online study materials."
  ] : [
    "CGL ACE - Premium Preparation Study Material",
    "==================================================",
    `Topic: ${title}`,
    `Subject: ${subject}`,
    `Format: ${type}`,
    `Published Date: ${publishDate}`,
    "",
    "KEY CONCEPTS & STUDY NOTES:",
    "--------------------------------------------------",
    ...(customNotes && customNotes.length > 0 ? customNotes : getNotesForSubject(subject, title)),
    "",
    "--------------------------------------------------",
    "Generated from CGL Ace Study App. Good luck with your exams!",
    "Visit: http://localhost:3000 for mock tests and previous papers."
  ];

  // Adjust page height and starting Y coordinate based on whether it is a PYP
  const pageHeight = isPYP ? 1008 : 792;
  const startY = isPYP ? 950 : 740;

  let streamText = `BT\n/F1 10 Tf\n14 TL\n50 ${startY} Td\n`;
  for (const line of lines) {
    if (line.trim() === "") {
      streamText += "T*\n";
    } else {
      const escaped = line.replace(/[\\()]/g, "\\$&");
      streamText += `(${escaped}) Tj T*\n`;
    }
  }
  streamText += "ET";

  const object1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  const object2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
  const object3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 ${pageHeight}] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`;
  const object4 = "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";
  
  const streamHeader = `5 0 obj\n<< /Length ${streamText.length} >>\nstream\n`;
  const streamFooter = "\nendstream\nendobj\n";
  const object5 = streamHeader + streamText + streamFooter;

  const header = "%PDF-1.4\n";
  
  const offset1 = header.length;
  const offset2 = offset1 + object1.length;
  const offset3 = offset2 + object2.length;
  const offset4 = offset3 + object3.length;
  const offset5 = offset4 + object4.length;
  
  const xrefOffset = offset5 + object5.length;
  
  const xref = `xref\n0 6\n0000000000 65535 f \n${String(offset1).padStart(10, '0')} 00000 n \n${String(offset2).padStart(10, '0')} 00000 n \n${String(offset3).padStart(10, '0')} 00000 n \n${String(offset4).padStart(10, '0')} 00000 n \n${String(offset5).padStart(10, '0')} 00000 n \n`;
  
  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const pdfContent = header + object1 + object2 + object3 + object4 + object5 + xref + trailer;

  const bytes = new Uint8Array(pdfContent.length);
  for (let i = 0; i < pdfContent.length; i++) {
    bytes[i] = pdfContent.charCodeAt(i);
  }

  return new Blob([bytes], { type: "application/pdf" });
}

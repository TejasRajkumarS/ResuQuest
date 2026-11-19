import { Question } from '../types';

/**
 * Shuffles the options array of a question using Fisher-Yates shuffle
 * and correctly updates the `correctAnswer` index.
 */
export const shuffleQuestionOptions = (q: Question): Question => {
  const optionsWithMeta = q.options.map((optionText, idx) => ({
    text: optionText,
    isCorrect: idx === q.correctAnswer,
  }));

  // Fisher-Yates shuffle algorithm
  for (let i = optionsWithMeta.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithMeta[i], optionsWithMeta[j]] = [optionsWithMeta[j], optionsWithMeta[i]];
  }

  const newOptions = optionsWithMeta.map((o) => o.text);
  const newCorrectAnswer = optionsWithMeta.findIndex((o) => o.isCorrect);

  return {
    ...q,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };
};

export const RESUME_QUESTIONS: Question[] = [
  // --- Category: Action Verbs ---
  {
    id: 1,
    category: 'Action Verbs',
    question: 'Which of the following bullet points demonstrates the strongest use of active power verbs for a project management role?',
    options: [
      'Was responsible for overseeing team meetings and daily workflow tasks.',
      'Spearheaded a cross-functional team of 8 developers, delivering the project 2 weeks ahead of deadline.',
      'Helped out with managing project schedules and keeping track of budgets.',
      'Worked on leading software releases and communicated with client stakeholders.'
    ],
    correctAnswer: 1,
    explanation: '"Spearheaded" is a high-impact action verb that clearly establishes leadership and ownership, whereas passive terms like "Was responsible for" sound weak.',
    resumeImpact: {
      unlockedTitle: 'Executive Action-Oriented Experience Section',
      unlockedDescription: 'Replaced passive language with high-impact power verbs ("Spearheaded", "Architected", "Orchestrated").',
      points: 250,
      category: 'experience'
    }
  },
  {
    id: 2,
    category: 'Action Verbs',
    question: 'Instead of writing "Responsible for handling customer complaints", which active bullet point is most effective?',
    options: [
      'Handled customer issues on a daily basis.',
      'Resolved over 40 client inquiries daily, maintaining a 98% customer satisfaction rating.',
      'Talked to angry customers to fix their problems.',
      'Assisted in answering phone calls and dealing with complaint tickets.'
    ],
    correctAnswer: 1,
    explanation: '"Resolved" combined with volume (40) and outcome (98% CSAT) provides a clear picture of high performance.',
    resumeImpact: {
      unlockedTitle: 'Customer Experience Achievement Module',
      unlockedDescription: 'Transformed routine duties into quantifiable customer impact wins.',
      points: 260,
      category: 'experience'
    }
  },
  {
    id: 3,
    category: 'Action Verbs',
    question: 'Select the verb that BEST communicates process improvement and efficiency gains on a resume:',
    options: [
      'Streamlined',
      'Looked over',
      'Dealt with',
      'Was in charge of'
    ],
    correctAnswer: 0,
    explanation: '"Streamlined" directly signifies optimization, reduction of waste, and process modernization.',
    resumeImpact: {
      unlockedTitle: 'Process Optimization Experience Bullet',
      unlockedDescription: 'Integrated efficiency action verbs ("Streamlined", "Automated", "Optimized").',
      points: 250,
      category: 'experience'
    }
  },
  {
    id: 4,
    category: 'Action Verbs',
    question: 'Which action verb is best suited for describing software architecture or system building accomplishments?',
    options: [
      'Architected',
      'Participated',
      'Watched',
      'Maintained'
    ],
    correctAnswer: 0,
    explanation: '"Architected" indicates high-level engineering ownership and strategic design.',
    resumeImpact: {
      unlockedTitle: 'Technical Engineering Lead Module',
      unlockedDescription: 'Used tier-1 engineering verbs ("Architected", "Engineered", "Deployed").',
      points: 270,
      category: 'experience'
    }
  },
  {
    id: 5,
    category: 'Action Verbs',
    question: 'What is the weakness of starting bullet points with phrase "Worked on"?',
    options: [
      'It takes up too many letters.',
      'It is vague and fails to convey your specific degree of ownership or final outcome.',
      'It is forbidden by grammar rules.',
      'It sounds too technical for non-tech roles.'
    ],
    correctAnswer: 1,
    explanation: '"Worked on" obscures whether you led the project, wrote a single line of code, or merely attended a meeting.',
    resumeImpact: {
      unlockedTitle: 'Ownership & Accountability Verbs',
      unlockedDescription: 'Eliminated "Worked on" in favor of decisive verbs ("Pioneered", "Executed").',
      points: 230,
      category: 'experience'
    }
  },
  {
    id: 6,
    category: 'Action Verbs',
    question: 'Which power verb effectively replaces "Helped team members with training"?',
    options: [
      'Mentored',
      'Talked to',
      'Was around',
      'Observed'
    ],
    correctAnswer: 0,
    explanation: '"Mentored" emphasizes professional guidance, leadership, and structured knowledge transfer.',
    resumeImpact: {
      unlockedTitle: 'Leadership & Mentorship Achievement Accent',
      unlockedDescription: 'Highlighted team coaching and talent growth capabilities.',
      points: 240,
      category: 'experience'
    }
  },
  {
    id: 7,
    category: 'Action Verbs',
    question: 'Instead of "Changed old manual systems to new software", which bullet verb phrase is most professional?',
    options: [
      'Modernized legacy infrastructure by migrating to cloud native architecture.',
      'Swapped out old machines with new computers.',
      'Got rid of old software programs.',
      'Updated computer files.'
    ],
    correctAnswer: 0,
    explanation: '"Modernized legacy infrastructure" communicates strategic technical upgrade value.',
    resumeImpact: {
      unlockedTitle: 'Digital Transformation Experience Badge',
      unlockedDescription: 'Showcased modernization and cloud migration accomplishments.',
      points: 280,
      category: 'experience'
    }
  },
  {
    id: 8,
    category: 'Action Verbs',
    question: 'Which action verb conveys strong financial negotiations and contract management skills?',
    options: [
      'Negotiated',
      'Bought',
      'Signed',
      'Asked for'
    ],
    correctAnswer: 0,
    explanation: '"Negotiated" demonstrates fiscal diligence, persuasion, and cost containment.',
    resumeImpact: {
      unlockedTitle: 'Commercial Negotiation & Vendor Relations Bullet',
      unlockedDescription: 'Demonstrated cost savings via strategic vendor negotiations.',
      points: 260,
      category: 'experience'
    }
  },
  {
    id: 9,
    category: 'Action Verbs',
    question: 'Which power verb is strongest when describing data extraction or research findings?',
    options: [
      'Extracted',
      'Searched',
      'Browsed',
      'Copied'
    ],
    correctAnswer: 0,
    explanation: '"Extracted" implies systematic data mining, rigorous analysis, and actionable insights.',
    resumeImpact: {
      unlockedTitle: 'Data Mining & Insight Extraction Badge',
      unlockedDescription: 'Highlighted data-driven analytical depth.',
      points: 240,
      category: 'experience'
    }
  },
  {
    id: 10,
    category: 'Action Verbs',
    question: 'Which active verb best highlights launching a completely brand new product initiative from scratch?',
    options: [
      'Pioneered',
      'Maintained',
      'Continued',
      'Followed'
    ],
    correctAnswer: 0,
    explanation: '"Pioneered" highlights innovation, early-stage drive, and zero-to-one product creation.',
    resumeImpact: {
      unlockedTitle: 'Zero-to-One Innovation Highlight',
      unlockedDescription: 'Added pioneering venture launch bullet points.',
      points: 290,
      category: 'experience'
    }
  },
  {
    id: 11,
    category: 'Action Verbs',
    question: 'Instead of "In charge of social media accounts", which bullet point demonstrates active management?',
    options: [
      'Curated content strategy across 4 platforms, expanding organic audience reach by 140%.',
      'Posted photos on Instagram whenever possible.',
      'Managed Facebook pages for the office.',
      'Monitored online comment sections.'
    ],
    correctAnswer: 0,
    explanation: 'Combines strategic verb "Curated" with channel scope (4 platforms) and growth metric (140%).',
    resumeImpact: {
      unlockedTitle: 'Omnichannel Growth Strategy Bullet',
      unlockedDescription: 'Transformed social management into audience expansion metrics.',
      points: 260,
      category: 'experience'
    }
  },
  {
    id: 12,
    category: 'Action Verbs',
    question: 'Which action verb conveys strict adherence to quality and defect elimination in engineering?',
    options: [
      'Audited',
      'Glanced at',
      'Fiddled with',
      'Tried out'
    ],
    correctAnswer: 0,
    explanation: '"Audited" signifies formal evaluation, rigor, and compliance testing.',
    resumeImpact: {
      unlockedTitle: 'Quality Assurance & Compliance Badge',
      unlockedDescription: 'Emphasized zero-defect standards and thorough code auditing.',
      points: 230,
      category: 'experience'
    }
  },
  {
    id: 13,
    category: 'Action Verbs',
    question: 'Select the verb that best describes designing an educational curriculum or workshop series:',
    options: [
      'Authored',
      'Typed up',
      'Read aloud',
      'Researched'
    ],
    correctAnswer: 0,
    explanation: '"Authored" conveys original creation, subject matter expertise, and publication authority.',
    resumeImpact: {
      unlockedTitle: 'Knowledge Authoring & Enablement Accent',
      unlockedDescription: 'Highlighted training curriculum creation and publishing.',
      points: 240,
      category: 'experience'
    }
  },
  {
    id: 14,
    category: 'Action Verbs',
    question: 'Which bullet verb pair works best for revenue generation achievements?',
    options: [
      'Captured / Expanded',
      'Got / Made',
      'Took / Received',
      'Looked / Found'
    ],
    correctAnswer: 0,
    explanation: '"Captured market share" and "Expanded client pipeline" sound assertive and business-focused.',
    resumeImpact: {
      unlockedTitle: 'Commercial Expansion & Sales Growth Badge',
      unlockedDescription: 'Utilized executive growth verbs for revenue bullets.',
      points: 270,
      category: 'experience'
    }
  },
  {
    id: 15,
    category: 'Action Verbs',
    question: 'Which active verb describes bringing together divergent stakeholder views into unified alignment?',
    options: [
      'Harmonized',
      'Argued with',
      'Emailed',
      'Forwarded'
    ],
    correctAnswer: 0,
    explanation: '"Harmonized" or "Consolidated" demonstrates advanced interpersonal leadership and conflict resolution.',
    resumeImpact: {
      unlockedTitle: 'Stakeholder Alignment & Consensus Module',
      unlockedDescription: 'Showcased cross-functional negotiation and executive alignment.',
      points: 250,
      category: 'experience'
    }
  },

  // --- Category: Metrics & STAR ---
  {
    id: 16,
    category: 'Metrics & STAR',
    question: 'When writing bullet points using the STAR method, what is the most critical element to include?',
    options: [
      'A complete paragraph explaining the company backstory.',
      'A list of software tools used in alphabetical order.',
      'Quantifiable results (e.g. percentages, revenue growth, hours saved).',
      'The exact address and contact details of your supervisor.'
    ],
    correctAnswer: 2,
    explanation: 'Measurable impact proves your achievements with concrete numbers, percentages, or dollar figures.',
    resumeImpact: {
      unlockedTitle: 'Quantified Achievement Metrics Badge',
      unlockedDescription: 'Added concrete metrics ("Boosted conversion by 34%", "Saved 12 hrs/week") to career history.',
      points: 300,
      category: 'metrics'
    }
  },
  {
    id: 17,
    category: 'Metrics & STAR',
    question: 'What is the "Action" part of the STAR method on a resume?',
    options: [
      'The company name and logo.',
      'The specific steps, strategies, or technical tools YOU personally executed to address the problem.',
      'The final annual revenue of the company overall.',
      'The list of soft skills you possess like punctuality.'
    ],
    correctAnswer: 1,
    explanation: 'Action highlights your personal contribution—what specific methodology or tool you deployed.',
    resumeImpact: {
      unlockedTitle: 'STAR Method Action Framework',
      unlockedDescription: 'Clearly delineated individual contribution and technical ownership.',
      points: 230,
      category: 'experience'
    }
  },
  {
    id: 18,
    category: 'Metrics & STAR',
    question: 'How should you present financial or scale accomplishments on a resume?',
    options: [
      'Write "I helped make a lot of money for the client".',
      'Quantify the scope: "Managed a $500K annual budget, reducing operating expenses by 15% ($75K/year)".',
      'Keep financial details completely secret even if public.',
      'Guess random multi-billion dollar numbers.'
    ],
    correctAnswer: 1,
    explanation: 'Providing exact metrics (e.g. $500K budget, 15% reduction) gives immediate credibility.',
    resumeImpact: {
      unlockedTitle: 'Fiscal Responsibility & Budget Impact Section',
      unlockedDescription: 'Showcased fiscal management and dollar-value ROI to prospective employers.',
      points: 280,
      category: 'metrics'
    }
  },
  {
    id: 19,
    category: 'Metrics & STAR',
    question: 'If you cannot share exact confidential sales numbers due to an NDA, how can you still quantify achievements?',
    options: [
      'Leave out metrics entirely.',
      'Use relative percentages or performance tiers (e.g., "Ranked #2 out of 45 sales reps nationwide", "Increased team throughput by 35%").',
      'Make up fake figures.',
      'Write "Confidential numbers" for every bullet point.'
    ],
    correctAnswer: 1,
    explanation: 'Percentages, rankings, growth factors, and team sizes allow showing massive impact without breaching NDAs.',
    resumeImpact: {
      unlockedTitle: 'NDA-Safe Performance Metric Framework',
      unlockedDescription: 'Utilized relative percentages and competitive rankings for high impact.',
      points: 260,
      category: 'metrics'
    }
  },
  {
    id: 20,
    category: 'Metrics & STAR',
    question: 'Which of the following metrics best demonstrates website or software performance optimization?',
    options: [
      'Decreased page load latency by 420ms, improving mobile user retention by 18%.',
      'Made the website run faster than before.',
      'Spent 20 hours fixing code speed bugs.',
      'Installed new server equipment in the office.'
    ],
    correctAnswer: 0,
    explanation: 'Linking technical speed gains (420ms reduction) directly to business impact (18% retention growth) is gold standard.',
    resumeImpact: {
      unlockedTitle: 'Latency & UX Optimization Metric Bullet',
      unlockedDescription: 'Tied technical optimization to user retention outcomes.',
      points: 290,
      category: 'metrics'
    }
  },
  {
    id: 21,
    category: 'Metrics & STAR',
    question: 'What is missing from this bullet point? "Organized annual developer conference for software engineers."',
    options: [
      'The font color',
      'Scale metrics: Number of attendees, budget handled, or satisfaction survey score.',
      'The price of conference tickets.',
      'The name of the venue catering team.'
    ],
    correctAnswer: 1,
    explanation: 'Without scale (e.g., 500+ attendees, $50K budget, 95% CSAT), recruiters cannot judge the event complexity.',
    resumeImpact: {
      unlockedTitle: 'Scale & Volume Metric Multiplier',
      unlockedDescription: 'Enriched operational achievements with scale factors.',
      points: 240,
      category: 'metrics'
    }
  },
  {
    id: 22,
    category: 'Metrics & STAR',
    question: 'How can entry-level candidates or interns quantify achievements without prior full-time revenue data?',
    options: [
      'They cannot use numbers at all.',
      'Quantify project output scope: "Analyzed 1,200 survey responses", "Built 5 interactive React prototypes", "Presented to 30 stakeholders".',
      'Add fake employment years.',
      'List college course grade point average for every class.'
    ],
    correctAnswer: 1,
    explanation: 'Volume of work delivered, hours saved, or project deliverables completed provide compelling quantitative proof.',
    resumeImpact: {
      unlockedTitle: 'Early-Career Volume Metric Framework',
      unlockedDescription: 'Quantified project scope and deliverable volume for early professionals.',
      points: 250,
      category: 'metrics'
    }
  },
  {
    id: 23,
    category: 'Metrics & STAR',
    question: 'Which formula represents the ideal structure for a high-impact metric bullet point?',
    options: [
      'Action Verb + Task + Quantified Result / Business Impact.',
      'Personal Objective + List of Skills + Job Title.',
      'Paragraph Description + Company Bio + Manager Name.',
      'Buzzwords + Adjectives + Years of Experience.'
    ],
    correctAnswer: 0,
    explanation: 'Structure: [Strong Verb] + [What you did / tools used] + [Measurable outcome or metric impact].',
    resumeImpact: {
      unlockedTitle: 'High-Impact Formula Certification',
      unlockedDescription: 'Mastered the standard high-conversion bullet point formula.',
      points: 270,
      category: 'metrics'
    }
  },
  {
    id: 24,
    category: 'Metrics & STAR',
    question: 'Select the bullet point with the strongest customer retention impact metric:',
    options: [
      'Cut customer churn from 8% to 3.2% within 2 quarters by introducing proactive onboarding workflows.',
      'Helped stop customers from leaving our app.',
      'Maintained customer account lists in database.',
      'Created email templates for customer service representatives.'
    ],
    correctAnswer: 0,
    explanation: 'Specifies baseline shift (8% to 3.2%), timeframe (2 quarters), and intervention method (proactive onboarding).',
    resumeImpact: {
      unlockedTitle: 'Customer Retention & Churn Reduction Metric',
      unlockedDescription: 'Showcased retention metrics and timeframe milestones.',
      points: 280,
      category: 'metrics'
    }
  },
  {
    id: 25,
    category: 'Metrics & STAR',
    question: 'What metric best proves team productivity efficiency improvements in Agile development?',
    options: [
      'Increased sprint velocity by 28% while maintaining 99.4% bug-free deployment rate across 12 releases.',
      'Attended every single daily standup meeting on time.',
      'Wrote lots of Jira user stories.',
      'Worked long overtime hours during sprint deadlines.'
    ],
    correctAnswer: 0,
    explanation: 'Balancing speed metric (28% velocity boost) with quality metric (99.4% bug-free rate) demonstrates mastery.',
    resumeImpact: {
      unlockedTitle: 'Agile Velocity & Quality Metric Highlight',
      unlockedDescription: 'Combined speed and code quality metrics into career history.',
      points: 290,
      category: 'metrics'
    }
  },
  {
    id: 26,
    category: 'Metrics & STAR',
    question: 'Why is "Reduced server deployment cost by $120,000 annually" stronger than "Saved money on servers"?',
    options: [
      'It uses a dollar sign.',
      'It provides precise, verifiable economic impact that hiring managers can instantly evaluate.',
      'It sounds longer.',
      'It looks nicer on a phone screen.'
    ],
    correctAnswer: 1,
    explanation: 'Dollar metrics explicitly show ROI on your hiring salary.',
    resumeImpact: {
      unlockedTitle: 'Annualized Cost Reduction Badge',
      unlockedDescription: 'Quantified direct annual bottom-line savings.',
      points: 260,
      category: 'metrics'
    }
  },
  {
    id: 27,
    category: 'Metrics & STAR',
    question: 'How should human resources or recruitment accomplishments be quantified on a resume?',
    options: [
      'Reduced average time-to-hire from 45 days to 22 days while placing 65 technical hires in 1 year.',
      'Hired nice people for open roles.',
      'Looked through hundreds of resumes on LinkedIn.',
      'Sent interview emails to candidates.'
    ],
    correctAnswer: 0,
    explanation: 'Quantifies time efficiency (45 to 22 days) and volume (65 technical placements).',
    resumeImpact: {
      unlockedTitle: 'Talent Acquisition Speed & Volume Badge',
      unlockedDescription: 'Highlighted time-to-fill metric reductions.',
      points: 270,
      category: 'metrics'
    }
  },
  {
    id: 28,
    category: 'Metrics & STAR',
    question: 'Which metric demonstrates successful marketing campaign performance?',
    options: [
      'Generated 4,500 qualified sales leads, driving $350K in new pipeline revenue at a $12 CAC.',
      'Ran ads on Google and Facebook.',
      'Designed pretty banners for social media.',
      'Spent entire marketing budget.'
    ],
    correctAnswer: 0,
    explanation: 'Ties top-of-funnel lead count (4.5k) to pipeline revenue ($350k) and unit economics ($12 CAC).',
    resumeImpact: {
      unlockedTitle: 'Demand Generation & CAC Optimization Metric',
      unlockedDescription: 'Showcased acquisition metrics and revenue funnel contributions.',
      points: 280,
      category: 'metrics'
    }
  },
  {
    id: 29,
    category: 'Metrics & STAR',
    question: 'What is the "Situation" component of the STAR method used for on a resume?',
    options: [
      'Providing brief context for the challenge or business problem addressed.',
      'Listing company address details.',
      'Explaining why you left your previous job.',
      'Sharing personal hobbies.'
    ],
    correctAnswer: 0,
    explanation: 'Situation sets up the problem context so the scale of your achievement is understood.',
    resumeImpact: {
      unlockedTitle: 'Business Context & Problem Definition Section',
      unlockedDescription: 'Framed achievements against real business challenges.',
      points: 220,
      category: 'metrics'
    }
  },
  {
    id: 30,
    category: 'Metrics & STAR',
    question: 'Which bullet point demonstrates supply chain or inventory management excellence?',
    options: [
      'Optimized inventory turnover rate by 31%, reducing warehouse holding costs by $45K.',
      'Organized boxes on shelves in the stockroom.',
      'Ordered supplies when items ran low.',
      'Checked delivery trucks.'
    ],
    correctAnswer: 0,
    explanation: 'Combines operational efficiency metric (31% turnover rate) with holding cost savings ($45K).',
    resumeImpact: {
      unlockedTitle: 'Supply Chain Efficiency Metric Accent',
      unlockedDescription: 'Highlighted inventory turnover and cost control victories.',
      points: 270,
      category: 'metrics'
    }
  },

  // --- Category: Formatting & ATS ---
  {
    id: 31,
    category: 'Formatting & ATS',
    question: 'What is an Applicant Tracking System (ATS) red flag that can prevent your resume from being read properly?',
    options: [
      'Using standard clean bullet points and bulleted lists.',
      'Placing vital information inside complex graphic text boxes or header/footer areas.',
      'Saving your document as a standard PDF or plain text file.',
      'Using clear section headings like "Work Experience" and "Education".'
    ],
    correctAnswer: 1,
    explanation: 'Many ATS scanners struggle to read text inside floating text boxes or headers, skipping critical details.',
    resumeImpact: {
      unlockedTitle: 'ATS Clean-Parse Certification',
      unlockedDescription: 'Structured document hierarchy without text box traps or unparseable frames.',
      points: 200,
      category: 'formatting'
    }
  },
  {
    id: 32,
    category: 'Formatting & ATS',
    question: 'What is the optimal font size and styling rule for a readable, ATS-friendly body text on a resume?',
    options: [
      '8pt font with decorative scripts to fit everything on half a page.',
      '10pt to 12pt standard clean Sans-Serif or Serif font (e.g. Arial, Calibri, Inter, Garamond).',
      '18pt bold text throughout the entire document.',
      'Comic Sans MS in 14pt red font for visual pop.'
    ],
    correctAnswer: 1,
    explanation: 'Standard professional typography (10-12pt size) in clean fonts ensures human legibility and accurate ATS parsing.',
    resumeImpact: {
      unlockedTitle: 'Clean Typography & Layout Grid',
      unlockedDescription: 'Established golden ratio typography hierarchy for maximum readability.',
      points: 190,
      category: 'formatting'
    }
  },
  {
    id: 33,
    category: 'Formatting & ATS',
    question: 'When listing work experience, what is the standard and expected chronological order?',
    options: [
      'Reverse chronological order (most recent job first, working backwards).',
      'Alphabetical order by company name.',
      'Random order based on how much you liked the job.',
      'Forward chronological order (starting from your high school summer job).'
    ],
    correctAnswer: 0,
    explanation: 'Reverse-chronological order is the universal industry standard so recruiters see recent roles first.',
    resumeImpact: {
      unlockedTitle: 'Reverse-Chronological Career Hierarchy',
      unlockedDescription: 'Ordered positions reverse-chronologically for immediate recruiter clarity.',
      points: 200,
      category: 'formatting'
    }
  },
  {
    id: 34,
    category: 'Formatting & ATS',
    question: 'Which file format is safest for retaining exact design formatting while remaining ATS-parsable?',
    options: [
      'PDF saved directly from word processor without print-to-image conversion.',
      'Photoshop PSD file.',
      'JPEG image scan of printed paper.',
      'Zip archive containing 10 separate text files.'
    ],
    correctAnswer: 0,
    explanation: 'A vector-text PDF preserves visual layout on any screen while retaining selectable text for ATS algorithms.',
    resumeImpact: {
      unlockedTitle: 'ATS Multi-Platform File Export Format',
      unlockedDescription: 'Validated standard clean text PDF export configuration.',
      points: 210,
      category: 'formatting'
    }
  },
  {
    id: 35,
    category: 'Formatting & ATS',
    question: 'Why should you avoid using graphic skill progress bars or pie charts on an ATS resume?',
    options: [
      'They use too much ink when printed.',
      'ATS software parses images as empty white space, losing all data regarding your skill level.',
      'Colors are not allowed on resumes.',
      'Charts take up too little room.'
    ],
    correctAnswer: 1,
    explanation: 'Images and chart canvas elements are completely unreadable to automated resume parsing engines.',
    resumeImpact: {
      unlockedTitle: 'Text-Based Skill Section Optimizer',
      unlockedDescription: 'Replaced graphic progress bars with text-searchable skill lists.',
      points: 220,
      category: 'formatting'
    }
  },
  {
    id: 36,
    category: 'Formatting & ATS',
    question: 'What margin size should you maintain on a single-page professional resume?',
    options: [
      '0.5 inches to 1.0 inch standard margins.',
      '0.1 inches so text stretches to the very edge of paper.',
      '2.5 inches on both sides like a novel.',
      'Different margin sizes on every line.'
    ],
    correctAnswer: 0,
    explanation: '0.5" to 1.0" provides adequate whitespace and ensures printers do not clip text during physical printing.',
    resumeImpact: {
      unlockedTitle: 'Standard Print Margin Grid System',
      unlockedDescription: 'Applied balanced 0.75" document margins for clean visual breathing room.',
      points: 190,
      category: 'formatting'
    }
  },
  {
    id: 37,
    category: 'Formatting & ATS',
    question: 'Which section header naming convention is best recognized by ATS semantic parsers?',
    options: [
      'Standard terms: "Work Experience", "Education", "Skills", "Projects".',
      'Creative terms: "Where I Have Been", "My Wisdom", "Cool Stuff Built".',
      'Invisible symbols like "★ ★ ★".',
      'Foreign language translations without context.'
    ],
    correctAnswer: 0,
    explanation: 'ATS algorithms are hardcoded to scan for standard keywords like "Work Experience" or "Employment History".',
    resumeImpact: {
      unlockedTitle: 'Semantic Section Heading Standardization',
      unlockedDescription: 'Adopted standard section titles for flawless machine categorization.',
      points: 200,
      category: 'formatting'
    }
  },
  {
    id: 38,
    category: 'Formatting & ATS',
    question: 'Why is using tables for entire resume layout alignment risky on older ATS systems?',
    options: [
      'Tables make the text turn blue.',
      'Some parsers read table cells left-to-right across columns, scrambling content order.',
      'Tables increase file size by 500MB.',
      'Tables delete bullet points.'
    ],
    correctAnswer: 1,
    explanation: 'Multi-column tables can cause linear text parsers to read across columns, jumbling job titles and dates.',
    resumeImpact: {
      unlockedTitle: 'Single-Column Linear Flow Architecture',
      unlockedDescription: 'Structured content flow sequentially to prevent cross-column parsing bugs.',
      points: 230,
      category: 'formatting'
    }
  },
  {
    id: 39,
    category: 'Formatting & ATS',
    question: 'How should bullet points be styled visually for best readability and parsing?',
    options: [
      'Standard solid round dots (•) or dashes (-).',
      'Custom emojis like 🚀, 🔥, 💣 on every bullet.',
      'Hand-drawn star shapes.',
      'No bullet markers at all, just one long continuous paragraph.'
    ],
    correctAnswer: 0,
    explanation: 'Standard bullet symbols (•) are universally recognized by both human eyes and machine parsers.',
    resumeImpact: {
      unlockedTitle: 'Standardized Symbol & Bullet Palette',
      unlockedDescription: 'Cleaned bullet markers for clean visual scanability.',
      points: 180,
      category: 'formatting'
    }
  },
  {
    id: 40,
    category: 'Formatting & ATS',
    question: 'What is the optimal color contrast rule for text vs. document background on a resume?',
    options: [
      'High-contrast dark charcoal/black text on a clean white or warm off-white background.',
      'Light gray text on white background.',
      'Yellow text on black background.',
      'Neon pink text on purple background.'
    ],
    correctAnswer: 0,
    explanation: 'Dark charcoal (#1e293b or #0f172a) on white guarantees WCAG AA readability for human recruiters.',
    resumeImpact: {
      unlockedTitle: 'High-Contrast Professional Palette',
      unlockedDescription: 'Selected high-contrast slate-on-white palette for effortless scanning.',
      points: 190,
      category: 'formatting'
    }
  },
  {
    id: 41,
    category: 'Formatting & ATS',
    question: 'Where should dates of employment be placed relative to job titles for quick recruiter scanning?',
    options: [
      'Right-aligned on the same line as the job title or company name.',
      'Buried in the middle of bullet paragraphs.',
      'At the very bottom of the entire page in a footnote.',
      'Dates should be omitted entirely.'
    ],
    correctAnswer: 0,
    explanation: 'Right-aligning dates creates an organized right margin axis that recruiters scan in under 2 seconds.',
    resumeImpact: {
      unlockedTitle: 'Right-Aligned Chronological Axis Layout',
      unlockedDescription: 'Right-aligned employment dates for fast 6-second recruiter scanning.',
      points: 210,
      category: 'formatting'
    }
  },
  {
    id: 42,
    category: 'Formatting & ATS',
    question: 'What is the problem with hyperlinking anchor text like "Click Here" on a printed or PDF resume?',
    options: [
      'It looks unprofessional; instead spell out short URLs or clean link labels like "github.com/username".',
      'It breaks the printer ink.',
      'It causes ATS engines to crash.',
      'It is forbidden by law.'
    ],
    correctAnswer: 0,
    explanation: 'If a recruiter prints your resume, "Click Here" provides no usable text URL. Use explicit URLs like "linkedin.com/in/alexsmith".',
    resumeImpact: {
      unlockedTitle: 'Explicit Printable URL Standards',
      unlockedDescription: 'Formatted web links so they remain functional on paper and screen.',
      points: 180,
      category: 'formatting'
    }
  },
  {
    id: 43,
    category: 'Formatting & ATS',
    question: 'How should job titles be visually distinguished from company names on a resume layout?',
    options: [
      'Use bold weight for Job Title and regular or italic font for Company Name & Location.',
      'Use identical font size, weight, and style for everything.',
      'Put company names in ALL CAPS and job titles in tiny 6pt font.',
      'Highlight job titles in bright red marker.'
    ],
    correctAnswer: 0,
    explanation: 'Typographic hierarchy (Bold job title + regular italic company) guides the eye instantly.',
    resumeImpact: {
      unlockedTitle: 'Typographic Hierarchy Grid System',
      unlockedDescription: 'Applied bold-italic contrast hierarchy across all position headers.',
      points: 200,
      category: 'formatting'
    }
  },
  {
    id: 44,
    category: 'Formatting & ATS',
    question: 'Why should you avoid submitting a scanned image PDF (e.g. photo of paper) to job portals?',
    options: [
      'Image PDFs contain no embedded text layer, rendering them 100% unreadable to ATS parsers.',
      'Scanned files take 3 days to upload.',
      'Scanned files flip upside down automatically.',
      'Scanned files change text to another language.'
    ],
    correctAnswer: 0,
    explanation: 'Scanned image PDFs are just picture pixels without ASCII/UTF-8 text characters.',
    resumeImpact: {
      unlockedTitle: 'Embedded Text Layer Validation',
      unlockedDescription: 'Ensured 100% vector text selection support across document exports.',
      points: 220,
      category: 'formatting'
    }
  },
  {
    id: 45,
    category: 'Formatting & ATS',
    question: 'What is line height (leading) best practice for body bullet points on a resume?',
    options: [
      '1.15 to 1.35 line height for comfortable reading density.',
      '1.0 line height so lines touch each other.',
      '3.0 double spacing across the whole page.',
      'Variable line spacing on every sentence.'
    ],
    correctAnswer: 0,
    explanation: '1.2 line height maximizes information density while keeping text lines separated and readable.',
    resumeImpact: {
      unlockedTitle: 'Micro-Typography Leading Adjuster',
      unlockedDescription: 'Calibrated line-height spacing for comfortable visual reading.',
      points: 190,
      category: 'formatting'
    }
  },

  // --- Category: Structure & Summary ---
  {
    id: 46,
    category: 'Structure & Summary',
    question: 'Which is the most effective Professional Summary for a Mid-Level Data Analyst?',
    options: [
      'Hardworking worker seeking a challenging position in a growing company where I can learn new things.',
      'Results-driven Data Analyst with 4+ years converting raw complex data into actionable business intelligence, boosting client revenue by average 18%.',
      'I have been doing data analysis for a while now and I am proficient in Excel, SQL, and Python.',
      'Objective: To obtain an entry to mid-level analyst role to leverage my passion for numbers.'
    ],
    correctAnswer: 1,
    explanation: 'Highlights title, experience level, core competency, and key measurable achievement upfront.',
    resumeImpact: {
      unlockedTitle: 'High-Impact Executive Summary',
      unlockedDescription: 'Authored a punchy, value-centric top-of-page elevator pitch.',
      points: 250,
      category: 'summary'
    }
  },
  {
    id: 47,
    category: 'Structure & Summary',
    question: 'For candidates with less than 5–7 years of experience, what is the ideal page length of a resume?',
    options: [
      'Strictly 1 page.',
      'At least 3 to 4 pages to show detail.',
      'Length does not matter; more pages always impress recruiters.',
      '15 pages detailing every school project.'
    ],
    correctAnswer: 0,
    explanation: 'For early to mid-career professionals, a 1-page high-density resume is the gold standard.',
    resumeImpact: {
      unlockedTitle: 'High-Density 1-Page Layout Blueprint',
      unlockedDescription: 'Optimized whitespace and density for a punchy 1-page professional presentation.',
      points: 240,
      category: 'formatting'
    }
  },
  {
    id: 48,
    category: 'Structure & Summary',
    question: 'What is the ideal way to format education entries for professionals with 3+ years of experience?',
    options: [
      'Place Education at the top, listing high school, middle school, and test scores.',
      'Place Education below Work Experience, listing Degree, Major, University, and Graduation Year.',
      'Write a 5-page thesis about your favorite college course.',
      'Omit education entirely.'
    ],
    correctAnswer: 1,
    explanation: 'For experienced candidates, work experience takes top priority. Education moves below experience.',
    resumeImpact: {
      unlockedTitle: 'Streamlined Credentials & Degree Section',
      unlockedDescription: 'Formatted academic achievements succinctly beneath relevant work history.',
      points: 190,
      category: 'summary'
    }
  },
  {
    id: 49,
    category: 'Structure & Summary',
    question: 'Where should key certifications (e.g., AWS Certified, PMP, Scrum Master) be placed for high visibility?',
    options: [
      'Hidden inside a footnote on the bottom of page 2.',
      'In a dedicated "Certifications & Credentials" section or alongside your professional summary header.',
      'In the middle of job bullet points from 5 years ago.',
      'Not mentioned at all.'
    ],
    correctAnswer: 1,
    explanation: 'Placing certifications in a dedicated section or header ensures recruiters instantly spot your credentials.',
    resumeImpact: {
      unlockedTitle: 'Accredited Certifications & License Badge',
      unlockedDescription: 'Highlighted recognized credentials (PMP, AWS, Scrum) prominently in header hierarchy.',
      points: 230,
      category: 'summary'
    }
  },
  {
    id: 50,
    category: 'Structure & Summary',
    question: 'Why are traditional "Objective Statements" (e.g. "Seeking a position to utilize my skills") outdated?',
    options: [
      'They focus on what the candidate wants from the company, rather than what value the candidate offers the employer.',
      'They are too short.',
      'They require signatures.',
      'They use words longer than 5 letters.'
    ],
    correctAnswer: 0,
    explanation: 'Modern recruiters prefer value-oriented Professional Summaries highlighting ROI over self-serving objectives.',
    resumeImpact: {
      unlockedTitle: 'Value-Proposition Headline Generator',
      unlockedDescription: 'Replaced outdated objective lines with candidate value headlines.',
      points: 220,
      category: 'summary'
    }
  },
  {
    id: 51,
    category: 'Structure & Summary',
    question: 'What elements belong in a modern resume contact information header?',
    options: [
      'Full Name, City/State, Phone Number, Professional Email, LinkedIn URL, Portfolio/GitHub Link.',
      'Full Home Address, Drivers License Number, Social Security Number, Passport Photo.',
      'Parents Names, High School Mascot, Favorite Color.',
      'Emergency Contact, Blood Type, Salary History.'
    ],
    correctAnswer: 0,
    explanation: 'Header should contain professional contact channels without sensitive identity risk data.',
    resumeImpact: {
      unlockedTitle: 'Professional Header Contact Block',
      unlockedDescription: 'Clean header block with digital links and region identifiers.',
      points: 200,
      category: 'summary'
    }
  },
  {
    id: 52,
    category: 'Structure & Summary',
    question: 'How should senior executives (15+ years experience) structure older career history (10+ years ago)?',
    options: [
      'Summarize older roles in a concise "Early Career Experience" section with job title, company, and dates without lengthy bullets.',
      'List every single minor task from 25 years ago in full 10-bullet detail.',
      'Delete all mention of early career.',
      'Falsify dates to make career look shorter.'
    ],
    correctAnswer: 0,
    explanation: 'Summarizing early career roles saves high-value page real estate for recent high-impact leadership wins.',
    resumeImpact: {
      unlockedTitle: 'Executive Early Career Summary Section',
      unlockedDescription: 'Streamlined 10+ year historic roles into a clean executive block.',
      points: 260,
      category: 'summary'
    }
  },
  {
    id: 53,
    category: 'Structure & Summary',
    question: 'When is a "Projects Section" most valuable on a resume?',
    options: [
      'For students, career changers, or software engineers wanting to prove hands-on application of new tech stacks.',
      'Only for professional architects building real physical bridges.',
      'Never, projects should never be included.',
      'For listing high school art assignments.'
    ],
    correctAnswer: 0,
    explanation: 'Highlighted personal or open-source projects give proof of hands-on technical ability when work history is fresh.',
    resumeImpact: {
      unlockedTitle: 'Hands-On Technical Project Showcase',
      unlockedDescription: 'Added high-relevance personal and open-source project architecture section.',
      points: 240,
      category: 'summary'
    }
  },
  {
    id: 54,
    category: 'Structure & Summary',
    question: 'How many bullet points per job role is considered optimal for recent positions?',
    options: [
      '3 to 5 targeted, high-impact bullet points.',
      '15 to 20 detailed paragraphs per job.',
      'Exactly 1 bullet point for every job regardless of length.',
      'No bullet points, only a bullet list of company co-workers.'
    ],
    correctAnswer: 0,
    explanation: '3–5 punchy bullets keep recruiter focus locked on top accomplishments without reader fatigue.',
    resumeImpact: {
      unlockedTitle: 'Optimal Density 4-Bullet Standard',
      unlockedDescription: 'Calibrated experience sections to 3-5 punchy achievement bullets.',
      points: 210,
      category: 'summary'
    }
  },
  {
    id: 55,
    category: 'Structure & Summary',
    question: 'What is the purpose of an "Honors & Awards" section on a resume?',
    options: [
      'To showcase top performance recognition (e.g., "Employee of the Year", "President’s Club", "Hackathon 1st Place").',
      'To list participation trophies from childhood sports.',
      'To brag about video game achievements.',
      'To fill empty space when you ran out of words.'
    ],
    correctAnswer: 0,
    explanation: 'Recognized industry or company awards prove elite top-percentile performance.',
    resumeImpact: {
      unlockedTitle: 'Industry Honors & Performance Awards Badge',
      unlockedDescription: 'Showcased verified top-performer accolades and hackathon wins.',
      points: 250,
      category: 'summary'
    }
  },
  {
    id: 56,
    category: 'Structure & Summary',
    question: 'How should language fluency credentials be listed on a resume?',
    options: [
      'List language name alongside official fluency level (e.g., "Spanish: Native | French: Professional Working Proficiency").',
      'Write "I know a few words in 10 languages".',
      'Rate languages with 5-star ratings.',
      'Omit languages even if bilingual in an international business.'
    ],
    correctAnswer: 0,
    explanation: 'Using standard CEFR or professional terms (Native, Bilingual, Professional) sets clear expectations.',
    resumeImpact: {
      unlockedTitle: 'Global Multilingual Competency Badge',
      unlockedDescription: 'Added standardized linguistic proficiency credentials.',
      points: 230,
      category: 'summary'
    }
  },
  {
    id: 57,
    category: 'Structure & Summary',
    question: 'What is the best way to present volunteer experience on a professional resume?',
    options: [
      'Include it in a "Community Leadership & Volunteer Work" section if relevant to soft skills, governance, or career breaks.',
      'Mix volunteer tasks inside paid corporate experience without mentioning it was unpaid.',
      'Never include volunteer work.',
      'Write a 3-page essay on charity philosophy.'
    ],
    correctAnswer: 0,
    explanation: 'Volunteer work demonstrates leadership, initiative, and community engagement.',
    resumeImpact: {
      unlockedTitle: 'Community Leadership & Board Volunteer Section',
      unlockedDescription: 'Highlighted civic leadership and pro-bono initiative.',
      points: 220,
      category: 'summary'
    }
  },
  {
    id: 58,
    category: 'Structure & Summary',
    question: 'Where should GPA be included on a resume?',
    options: [
      'Only for recent graduates (within 1-2 years of university) if GPA is 3.5 or higher.',
      'Always list GPA for every job position.',
      'List GPA even if it is 2.1.',
      'Put GPA in bold red 24pt font at top of document.'
    ],
    correctAnswer: 0,
    explanation: 'GPA is only relevant for new grads with strong academic standing (3.5+). Experienced pros drop GPA entirely.',
    resumeImpact: {
      unlockedTitle: 'Academic Distinction & GPA Highlight',
      unlockedDescription: 'Strategically featured academic honors for early-career profile.',
      points: 200,
      category: 'summary'
    }
  },
  {
    id: 59,
    category: 'Structure & Summary',
    question: 'What is the role of a "Core Competencies" keyword block at the top of a resume?',
    options: [
      'To provide a 6-10 item scannable grid of domain skills for quick ATS parser indexing and recruiter scan.',
      'To replace all job work history.',
      'To list personal character traits like "Funny" and "Kind".',
      'To take up room so you do not have to write bullet points.'
    ],
    correctAnswer: 0,
    explanation: 'Core Competency grids give recruiters immediate line-of-sight into domain match within 3 seconds.',
    resumeImpact: {
      unlockedTitle: 'Core Competency Top-Grid Block',
      unlockedDescription: 'Added high-relevance domain keyword grid to top document fold.',
      points: 250,
      category: 'summary'
    }
  },
  {
    id: 60,
    category: 'Structure & Summary',
    question: 'How should continuous professional development (courses, workshops) be displayed?',
    options: [
      'In a "Professional Development & Training" section with course title, provider (e.g., Coursera, General Assembly), and year.',
      'Buried in personal interest hobbies.',
      'Listed as full 4-year university degrees.',
      'Omitted entirely.'
    ],
    correctAnswer: 0,
    explanation: 'Showcases commitment to lifelong learning and upskilling in modern technologies.',
    resumeImpact: {
      unlockedTitle: 'Continuous Upskilling & Workshop Showcase',
      unlockedDescription: 'Integrated modern course credentials and technical certifications.',
      points: 210,
      category: 'summary'
    }
  },

  // --- Category: Tailoring ---
  {
    id: 61,
    category: 'Tailoring',
    question: 'How should you tailor your resume when applying for a specific target job posting?',
    options: [
      'Copy and paste the entire job description text in white font at the bottom.',
      'Align your skills and bullet point keywords with the exact terminology used in the job description requirements.',
      'Change your official past job titles to match whatever the post demands.',
      'Send the exact same generic master resume to 500 companies.'
    ],
    correctAnswer: 1,
    explanation: 'Tailoring means mirroring key industry skills and phraseology from the target job description.',
    resumeImpact: {
      unlockedTitle: 'Role-Targeted Keyword Matrix',
      unlockedDescription: 'Aligned terminology directly with target industry job requirements.',
      points: 220,
      category: 'skills'
    }
  },
  {
    id: 62,
    category: 'Tailoring',
    question: 'Which skills section organization method is most effective for technical or specialized roles?',
    options: [
      'A long unorganized paragraph of 50 random words.',
      'Categorized skill clusters (e.g. Languages: Python, SQL | Frameworks: React, Node | Tools: Docker, Git).',
      'Rating skills with percentage bars (e.g. "Python: 87%").',
      'Listing generic traits like "Good listener".'
    ],
    correctAnswer: 1,
    explanation: 'Categorized skill groups allow recruiters to immediately locate key technical competencies in seconds.',
    resumeImpact: {
      unlockedTitle: 'Categorized Competency Matrix',
      unlockedDescription: 'Grouped technical & domain competencies into scannable skill clusters.',
      points: 210,
      category: 'skills'
    }
  },
  {
    id: 63,
    category: 'Tailoring',
    question: 'What is a "Master Resume" and how is it used effectively in job searching?',
    options: [
      'A master resume is a 10-page document signed by a university president.',
      'A comprehensive repository of all your roles, projects, and metrics, used to quickly curate custom 1-page targeted resumes.',
      'A resume that you never update after graduating.',
      'A document containing secret passwords for hiring portals.'
    ],
    correctAnswer: 1,
    explanation: 'A Master Resume acts as your personal career database from which you curate targeted 1-page applications.',
    resumeImpact: {
      unlockedTitle: 'Master Career Vault & Tailoring System',
      unlockedDescription: 'Built a modular repository system for rapid, high-relevance resume customization.',
      points: 270,
      category: 'skills'
    }
  },
  {
    id: 64,
    category: 'Tailoring',
    question: 'What is "Keyword Match Rate" in ATS optimization software?',
    options: [
      'The percentage overlap between hard/soft skills in the job description and those explicitly present on your resume.',
      'The speed at which you type keywords into an online form.',
      'The number of words on page 1.',
      'The font match rating.'
    ],
    correctAnswer: 0,
    explanation: 'Higher keyword alignment score signals strong role relevance to automated ATS screeners.',
    resumeImpact: {
      unlockedTitle: 'ATS Keyword Match Rate Optimizer',
      unlockedDescription: 'Increased hard-skill density to achieve top-tier keyword match scores.',
      points: 260,
      category: 'skills'
    }
  },
  {
    id: 65,
    category: 'Tailoring',
    question: 'How should industry acronyms (e.g., SEO, SaaS, API, CRM) be formatted on a resume?',
    options: [
      'Spell out full phrase followed by acronym in parentheses on first occurrence (e.g., "Customer Relationship Management (CRM)").',
      'Use only invented acronyms that nobody knows.',
      'Never use acronyms under any circumstances.',
      'Write acronyms in binary code.'
    ],
    correctAnswer: 0,
    explanation: 'Including both full phrase and acronym ensures ATS scanners match either search query variation.',
    resumeImpact: {
      unlockedTitle: 'Dual Industry Acronym Standardization',
      unlockedDescription: 'Formatted acronyms with full terms for 100% search coverage.',
      points: 230,
      category: 'skills'
    }
  },
  {
    id: 66,
    category: 'Tailoring',
    question: 'If transitioning from Marketing to Product Management, how should past marketing bullets be framed?',
    options: [
      'Emphasize transferable skills: User research, customer persona definition, cross-functional roadmap alignment, data analytics.',
      'Pretend you never worked in marketing.',
      'Keep marketing jargon like "media buy CPC" without connecting it to product design.',
      'Write that marketing is identical to product management.'
    ],
    correctAnswer: 0,
    explanation: 'Framing past experience through transferable competency lenses builds credibility during career pivots.',
    resumeImpact: {
      unlockedTitle: 'Career Pivot Transferable Skill Bridge',
      unlockedDescription: 'Re-framed previous industry achievements using target role competencies.',
      points: 280,
      category: 'skills'
    }
  },
  {
    id: 67,
    category: 'Tailoring',
    question: 'Where is the best place to feature top required tech stack skills (e.g. React, AWS, Python) for a senior dev role?',
    options: [
      'In both the top Skills summary section AND contextually inside experience bullet points with real project outcomes.',
      'Only in a footnote on page 2.',
      'Inside the cover letter only.',
      'In an image attachment.'
    ],
    correctAnswer: 0,
    explanation: 'Listing skills in summary AND proving usage in bullet points provides both keyword density and evidence.',
    resumeImpact: {
      unlockedTitle: 'Dual-Layer Tech Stack Integration',
      unlockedDescription: 'Reinforced hard skills with contextual project evidence in career history.',
      points: 270,
      category: 'skills'
    }
  },
  {
    id: 68,
    category: 'Tailoring',
    question: 'Why is copying and pasting exact sentences from a job posting onto your resume risky?',
    options: [
      'Recruiters instantly spot identical job description phrasing, making the candidate look unoriginal or deceitful.',
      'It changes document margins.',
      'It locks the PDF file.',
      'It turns all text into Spanish.'
    ],
    correctAnswer: 0,
    explanation: 'Plagiarism of job descriptions is an immediate red flag. Mirror terms naturally within authentic personal stories.',
    resumeImpact: {
      unlockedTitle: 'Authentic Keyword Mirroring Badge',
      unlockedDescription: 'Naturally woven target keywords into genuine career narratives.',
      points: 240,
      category: 'skills'
    }
  },
  {
    id: 69,
    category: 'Tailoring',
    question: 'How should soft skills (e.g., "Leadership", "Problem Solving") be presented effectively on a resume?',
    options: [
      'Demonstrated through action bullet stories (e.g., "Led team of 6", "Resolved complex bug") rather than just listed as standalone buzzwords.',
      'Listed in a 50-word paragraph of generic adjectives.',
      'Given 5-star ratings.',
      'Omitted completely.'
    ],
    correctAnswer: 0,
    explanation: 'Show, don’t tell! Proving soft skills through concrete stories carries far more weight than empty buzzwords.',
    resumeImpact: {
      unlockedTitle: 'Evidence-Backed Soft Skill Storyteller',
      unlockedDescription: 'Validated soft skills through concrete team leadership outcomes.',
      points: 250,
      category: 'skills'
    }
  },
  {
    id: 70,
    category: 'Tailoring',
    question: 'What is the recommended approach for handling modern remote work skills on a resume?',
    options: [
      'Mention collaboration tools (e.g., Slack, Jira, Zoom, Notion, Figma) and highlight self-directed asynchronous productivity.',
      'Write "I like working in my pajamas".',
      'Never mention remote work.',
      'Claim you invented remote working.'
    ],
    correctAnswer: 0,
    explanation: 'Demonstrating async collaboration tooling proves readiness for distributed workforce environments.',
    resumeImpact: {
      unlockedTitle: 'Async Remote Workforce Tooling Badge',
      unlockedDescription: 'Highlighted distributed team collaboration tools (Jira, Slack, Figma).',
      points: 220,
      category: 'skills'
    }
  },
  {
    id: 71,
    category: 'Tailoring',
    question: 'How should a candidate tailor job title headers if their official title was non-standard (e.g., "Ninja Developer")?',
    options: [
      'Use industry standard equivalent in brackets: "Software Engineer [Internal Title: Tech Ninja]".',
      'Keep "Ninja Developer" as is without explanation.',
      'Lie and claim title was "CTO".',
      'Omit job title completely.'
    ],
    correctAnswer: 0,
    explanation: 'Bracketed standard equivalents maintain search engine match while preserving official employment verification accuracy.',
    resumeImpact: {
      unlockedTitle: 'Normalized Job Title Standardizer',
      unlockedDescription: 'Mapped non-standard corporate titles to universal industry terms.',
      points: 230,
      category: 'skills'
    }
  },
  {
    id: 72,
    category: 'Tailoring',
    question: 'What is the purpose of analyzing a target company’s core values before submitting a resume?',
    options: [
      'To mirror cultural themes (e.g., "Customer Obsession", "Bias for Action") in bullet points and summary framing.',
      'To memorize company office addresses.',
      'To criticize company competitors.',
      'To change your name to match company founder.'
    ],
    correctAnswer: 0,
    explanation: 'Aligning with company principles signals cultural fit and executive maturity.',
    resumeImpact: {
      unlockedTitle: 'Cultural Value Alignment Accent',
      unlockedDescription: 'Aligned achievements with employer core cultural values.',
      points: 250,
      category: 'skills'
    }
  },
  {
    id: 73,
    category: 'Tailoring',
    question: 'How many different versions of your resume should you maintain for distinct job families?',
    options: [
      '2 to 4 targeted versions tailored for each distinct role archetype (e.g. Fullstack Dev vs DevOps Engineer).',
      'Exactly 1 generic version for all 10,000 global jobs.',
      '100 completely random versions.',
      'Zero versions.'
    ],
    correctAnswer: 0,
    explanation: 'Maintaining 2-4 core role variants allows quick customization without starting from scratch every time.',
    resumeImpact: {
      unlockedTitle: 'Multi-Role Persona Matrix System',
      unlockedDescription: 'Architected modular resume variants for distinct technical pathways.',
      points: 270,
      category: 'skills'
    }
  },
  {
    id: 74,
    category: 'Tailoring',
    question: 'Which method best validates if your resume is tailored enough for a specific job posting?',
    options: [
      'Running a word frequency comparison between your resume text and the target job description requirements.',
      'Asking a family member if it looks nice.',
      'Checking if the page count is an even number.',
      'Printing it on heavy cardstock paper.'
    ],
    correctAnswer: 0,
    explanation: 'Word frequency scans uncover missing core competencies before submitting to ATS portals.',
    resumeImpact: {
      unlockedTitle: 'Target Gap Analysis & Audit Badge',
      unlockedDescription: 'Audited keyword density against live job specification benchmark.',
      points: 260,
      category: 'skills'
    }
  },
  {
    id: 75,
    category: 'Tailoring',
    question: 'When tailoring a resume for a startup vs. enterprise corporate role, what shift should occur?',
    options: [
      'Startup: Highlight cross-functional agility and ownership; Enterprise: Highlight process rigor, scale, and stakeholder governance.',
      'Startup: Use 50 pages; Enterprise: Use 1 sentence.',
      'No shift, both are identical.',
      'Enterprise: Add cartoon drawings; Startup: Use Latin phrases.'
    ],
    correctAnswer: 0,
    explanation: 'Startups value scrappy versatility and speed, while enterprise firms value process compliance and large-scale navigation.',
    resumeImpact: {
      unlockedTitle: 'Startup vs Enterprise Context Adapter',
      unlockedDescription: 'Tailored framing to organizational scale and operational pace.',
      points: 280,
      category: 'skills'
    }
  },

  // --- Category: Mistakes to Avoid ---
  {
    id: 76,
    category: 'Mistakes to Avoid',
    question: 'Which piece of personal information should generally be OMITTED from a US/Global standard resume?',
    options: [
      'City and State / Region',
      'LinkedIn Profile URL',
      'Marital status, age, personal photograph, and exact home address',
      'Professional Email address'
    ],
    correctAnswer: 2,
    explanation: 'Personal attributes like age, marital status, or photo should be omitted to prevent bias and keep focus on merit.',
    resumeImpact: {
      unlockedTitle: 'Bias-Free Professional Profile Header',
      unlockedDescription: 'Eliminated unnecessary personal details, focusing purely on professional credentials.',
      points: 180,
      category: 'summary'
    }
  },
  {
    id: 77,
    category: 'Mistakes to Avoid',
    question: 'Why are self-assessed skill progress bars (e.g. "Java 80%", "Communication 90%") discouraged on modern resumes?',
    options: [
      'They take up too little space.',
      'They are arbitrary, subjective, and tell ATS scanners nothing about your actual work experience.',
      'They are strictly illegal in job applications.',
      'They make your resume look too simple.'
    ],
    correctAnswer: 1,
    explanation: 'Skill bars are meaningless without context. Demonstrating skill through bullet points with real achievements is far superior.',
    resumeImpact: {
      unlockedTitle: 'Contextual Skill Demonstration Module',
      unlockedDescription: 'Replaced arbitrary rating sliders with evidence-backed project bullet points.',
      points: 220,
      category: 'skills'
    }
  },
  {
    id: 78,
    category: 'Mistakes to Avoid',
    question: 'Which verb tense rule applies when writing bullet points for current vs. past jobs?',
    options: [
      'Use future tense for all jobs ("Will lead teams").',
      'Use present tense for current position roles, and past tense for past roles.',
      'Mix present and past tense randomly in the same bullet point.',
      'Use passive past participle for everything.'
    ],
    correctAnswer: 1,
    explanation: 'Current roles use present-tense verbs ("Lead", "Develop"), while previous roles strictly use past-tense verbs ("Led", "Developed").',
    resumeImpact: {
      unlockedTitle: 'Grammatical Consistency & Tense Mastery',
      unlockedDescription: 'Standardized verb tenses across current and historical career positions.',
      points: 180,
      category: 'experience'
    }
  },
  {
    id: 79,
    category: 'Mistakes to Avoid',
    question: 'What is a major consequence of having spelling or grammatical typos on a submitted resume?',
    options: [
      'Over 75% of recruiters reject candidates immediately due to lack of attention to detail.',
      'The ATS computer burns out.',
      'Nothing, typos are considered charming.',
      'It automatically doubles your salary.'
    ],
    correctAnswer: 0,
    explanation: 'Typos demonstrate careless execution. Proofreading with multiple reviewers or tools is critical.',
    resumeImpact: {
      unlockedTitle: 'Zero-Defect Proofreading Shield',
      unlockedDescription: 'Audited document grammar, syntax, and spelling for 100% precision.',
      points: 210,
      category: 'formatting'
    }
  },
  {
    id: 80,
    category: 'Mistakes to Avoid',
    question: 'Why should you avoid using unprofessional email addresses (e.g., "partyguy2005@hotmail.com") on job applications?',
    options: [
      'It projects an unbusinesslike image; instead use firstname.lastname@email.com.',
      'Hotmail servers block job offers.',
      'It makes the file size larger.',
      'It is required by federal law.'
    ],
    correctAnswer: 0,
    explanation: 'Clean, simple email conventions (e.g. alex.smith@gmail.com) convey professional polish.',
    resumeImpact: {
      unlockedTitle: 'Professional Handle & Branding Sanitizer',
      unlockedDescription: 'Standardized email handle to clean firstname.lastname convention.',
      points: 170,
      category: 'summary'
    }
  },
  {
    id: 81,
    category: 'Mistakes to Avoid',
    question: 'How should employment gaps (e.g., 6+ months between roles) be handled constructively on a resume?',
    options: [
      'Briefly account for gaps with proactive learning, caregiving, freelance consulting, or upskilling entries.',
      'Falsify employment dates to pretend there was no gap.',
      'Leave giant unexplained 5-year blank holes.',
      'Write "None of your business" in bold font.'
    ],
    correctAnswer: 0,
    explanation: 'Framing gaps around career development, caregiving, or freelance work maintains positive career momentum.',
    resumeImpact: {
      unlockedTitle: 'Proactive Employment Gap Bridge',
      unlockedDescription: 'Framed career hiatuses constructively with freelance and upskilling entries.',
      points: 250,
      category: 'experience'
    }
  },
  {
    id: 82,
    category: 'Mistakes to Avoid',
    question: 'Why is including salary history or expected pay on a resume discouraged?',
    options: [
      'It weakens your negotiation leverage and can prematurely screen you out before speaking to a hiring manager.',
      'Salaries cannot be written in numbers.',
      'It causes ATS engines to reject the file.',
      'It turns the document upside down.'
    ],
    correctAnswer: 0,
    explanation: 'Keep compensation negotiations separate from initial resume screening to protect your market value leverage.',
    resumeImpact: {
      unlockedTitle: 'Compensation Leverage & Strategy Shield',
      unlockedDescription: 'Removed compensation references to preserve salary negotiation leverage.',
      points: 230,
      category: 'summary'
    }
  },
  {
    id: 83,
    category: 'Mistakes to Avoid',
    question: 'What is the risk of using generic buzzwords like "Hardworking", "Detail-oriented", "Team player"?',
    options: [
      'They are meaningless filler words that every candidate uses without providing actual proof.',
      'They take up too little space.',
      'They make recruiters sad.',
      'They break ATS font styles.'
    ],
    correctAnswer: 0,
    explanation: 'Replace empty adjectives with concrete evidence (e.g., "Collaborated with 12 engineers" instead of "Team player").',
    resumeImpact: {
      unlockedTitle: 'Buzzword Elimination Filter',
      unlockedDescription: 'Purged fluff adjectives, replacing them with action-driven facts.',
      points: 220,
      category: 'skills'
    }
  },
  {
    id: 84,
    category: 'Mistakes to Avoid',
    question: 'Why should you avoid writing job descriptions in first-person pronouns ("I", "me", "my") on a resume?',
    options: [
      'Standard resume protocol dictates implied first-person bullet points starting directly with action verbs (e.g., "Led team" not "I led team").',
      'The letter "I" is unreadable by computers.',
      'It makes the resume 10 pages long.',
      'It causes printer ink to smudge.'
    ],
    correctAnswer: 0,
    explanation: 'Implied first-person phrasing (omitting "I/me") keeps bullet points dense, objective, and professional.',
    resumeImpact: {
      unlockedTitle: 'Implied First-Person Stylistic Standard',
      unlockedDescription: 'Streamlined bullet points by dropping redundant first-person pronouns.',
      points: 200,
      category: 'formatting'
    }
  },
  {
    id: 85,
    category: 'Mistakes to Avoid',
    question: 'What is the error in including "References available upon request" at the bottom of a resume?',
    options: [
      'It wastes valuable page space stating an obvious industry convention; recruiters will request references when needed.',
      'References are illegal.',
      'It offends hiring managers.',
      'It increases file size.'
    ],
    correctAnswer: 0,
    explanation: 'Omit "References upon request" to free up 2-3 valuable lines for high-impact achievement metrics.',
    resumeImpact: {
      unlockedTitle: 'Real Estate Optimization Purge',
      unlockedDescription: 'Eliminated redundant reference footers to maximize achievement content.',
      points: 190,
      category: 'formatting'
    }
  },
  {
    id: 86,
    category: 'Mistakes to Avoid',
    question: 'Why is exaggerating or falsifying job titles or degrees dangerous?',
    options: [
      'Background check verification services (e.g. Checkr, HireRight) verify dates, titles, and degrees with previous HR departments, leading to immediate offer rescission.',
      'It causes ATS systems to lock your phone.',
      'It changes your diploma color.',
      'It makes your resume physically heavy.'
    ],
    correctAnswer: 0,
    explanation: 'Honesty is paramount. Professional background checks verify employment history with past employer payroll records.',
    resumeImpact: {
      unlockedTitle: 'Verified Credential Integrity Badge',
      unlockedDescription: 'Validated 100% authentic employment records for background check compliance.',
      points: 270,
      category: 'summary'
    }
  },
  {
    id: 87,
    category: 'Mistakes to Avoid',
    question: 'What is the danger of using dense 10-line block paragraphs without bullet points for work experience?',
    options: [
      'Recruiters skim resumes in 6 seconds and will skip dense walls of unformatted text.',
      'Paragraphs cannot be saved as PDF.',
      'Paragraphs turn font color white.',
      'Paragraphs delete dates.'
    ],
    correctAnswer: 0,
    explanation: 'Bullet points create scannable visual anchors that capture recruiter attention in seconds.',
    resumeImpact: {
      unlockedTitle: 'Visual Skimability & Chunking Grid',
      unlockedDescription: 'Converted wall-of-text paragraphs into bite-sized bullet points.',
      points: 210,
      category: 'formatting'
    }
  },
  {
    id: 88,
    category: 'Mistakes to Avoid',
    question: 'Why should you avoid sending an editable Word document (.docx) if the job posting accepts PDF?',
    options: [
      'Word documents can display weird formatting shifts or missing fonts depending on the viewer’s software version.',
      'Word documents cannot hold text.',
      'Word documents delete bullet points.',
      'Word documents expand file size to 1GB.'
    ],
    correctAnswer: 0,
    explanation: 'PDF locks formatting visually across Windows, Mac, iOS, and Android screens.',
    resumeImpact: {
      unlockedTitle: 'Cross-Platform Layout Lock Shield',
      unlockedDescription: 'Locked visual formatting via standardized vector PDF generation.',
      points: 200,
      category: 'formatting'
    }
  },
  {
    id: 89,
    category: 'Mistakes to Avoid',
    question: 'How does including high school education impact a resume for candidates with a college degree or 5+ years experience?',
    options: [
      'It signals amateurism and wastes page space; high school entries should be removed once college or career begins.',
      'High school should always be listed at the top.',
      'High school entries are mandatory for all jobs.',
      'High school entries double your score.'
    ],
    correctAnswer: 0,
    explanation: 'Once you hold higher education or professional experience, high school details are redundant.',
    resumeImpact: {
      unlockedTitle: 'Academic Relevance Filter',
      unlockedDescription: 'Pruned outdated high school entries to highlight higher education and industry wins.',
      points: 180,
      category: 'summary'
    }
  },
  {
    id: 90,
    category: 'Mistakes to Avoid',
    question: 'What is the consequence of listing non-work related personal hobbies (e.g., "Enjoy watching movies, eating pizza")?',
    options: [
      'It dilutes your professional image unless the hobby directly demonstrates leadership or technical skill.',
      'It increases ATS keyword score.',
      'It makes the resume look shorter.',
      'It is strictly forbidden by computer hardware.'
    ],
    correctAnswer: 0,
    explanation: 'Reserve resume space for professional value; omit generic personal hobbies unless relevant to candidate story.',
    resumeImpact: {
      unlockedTitle: 'Professional Rigor & Content Filter',
      unlockedDescription: 'Replaced generic hobbies with high-value technical & professional achievements.',
      points: 200,
      category: 'summary'
    }
  }
];

export type SchemeCategory =
  | 'Agriculture'
  | 'Education'
  | 'Healthcare'
  | 'Housing'
  | 'Employment'
  | 'Women Empowerment'
  | 'Business'
  | 'Social Welfare'
  | 'Skill Development'
  | 'Finance';

export type SchemeTarget =
  | 'Farmers'
  | 'Students'
  | 'Women'
  | 'Senior Citizens'
  | 'Disabled'
  | 'SC/ST/OBC'
  | 'Entrepreneurs'
  | 'Job Seekers'
  | 'Below Poverty Line'
  | 'All Citizens';

export interface Scheme {
  id: string;
  title: string;
  shortTitle: string;
  department: string;
  category: SchemeCategory;
  targets: SchemeTarget[];
  state: 'Central' | string;
  benefit: string;
  financialAssistance: string;
  eligibilityScore: number;
  deadline: string | null;
  applicationMode: 'Online' | 'Offline' | 'Both';
  isNew: boolean;
  isTrending: boolean;
  isHighBenefit: boolean;
  description: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  applicationSteps: string[];
  officialUrl: string;
  processingTime: string;
  faqs: { q: string; a: string }[];
  tags: string[];
}

export const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    title: 'PM Kisan Samman Nidhi Yojana',
    shortTitle: 'PM-KISAN',
    department: 'Ministry of Agriculture',
    category: 'Agriculture',
    targets: ['Farmers'],
    state: 'Central',
    benefit: '₹6,000/year direct income support',
    financialAssistance: '₹6,000 per year',
    eligibilityScore: 96,
    deadline: '2024-12-31',
    applicationMode: 'Online',
    isNew: false,
    isTrending: true,
    isHighBenefit: true,
    description:
      'PM-KISAN provides income support of ₹6,000 per year to all landholding farmer families across India, paid in three equal installments of ₹2,000 each.',
    benefits: [
      '₹6,000 annual financial support',
      'Paid directly to bank account via DBT',
      'Three installments of ₹2,000 each',
      'No income cap for small/marginal farmers',
    ],
    eligibility: [
      'Small and marginal farmers with landholding up to 2 hectares',
      'Must be an Indian citizen',
      'Valid Aadhaar card required',
      'Active bank account with IFSC',
    ],
    documents: [
      'Aadhaar Card',
      'Land Records / Khatauniit',
      'Bank Passbook',
      'Mobile Number',
    ],
    applicationSteps: [
      'Visit pmkisan.gov.in',
      'Click on "Farmers Corner"',
      'Select "New Farmer Registration"',
      'Enter Aadhaar, mobile, state details',
      'Submit land records',
      'Verify OTP and submit',
    ],
    officialUrl: 'https://pmkisan.gov.in',
    processingTime: '30-45 days',
    faqs: [
      { q: 'Who is eligible for PM-KISAN?', a: 'Small and marginal farmers with less than 2 hectares of cultivable land.' },
      { q: 'How is the money transferred?', a: 'Directly to the registered bank account via DBT in three installments.' },
    ],
    tags: ['farmer', 'income support', 'agriculture', 'central'],
  },
  {
    id: 'pm-awas-yojana',
    title: 'Pradhan Mantri Awas Yojana',
    shortTitle: 'PMAY',
    department: 'Ministry of Housing & Urban Affairs',
    category: 'Housing',
    targets: ['Below Poverty Line', 'All Citizens'],
    state: 'Central',
    benefit: 'Subsidy up to ₹2.67 lakh on home loan',
    financialAssistance: 'Up to ₹2.67 lakh',
    eligibilityScore: 88,
    deadline: '2024-03-31',
    applicationMode: 'Both',
    isNew: false,
    isTrending: true,
    isHighBenefit: true,
    description:
      'PMAY aims to provide affordable housing to urban and rural poor by 2024 with interest subsidy on home loans and direct financial assistance.',
    benefits: [
      'Interest subsidy of 3-6.5% on home loans',
      'Up to ₹2.67 lakh subsidy for EWS/LIG',
      'Both urban and rural coverage',
      'Technology-driven construction',
    ],
    eligibility: [
      'Annual income below ₹18 lakh (varies by category)',
      'Should not own a pucca house anywhere in India',
      'Must be Indian citizen',
      'First-time home buyer preferred',
    ],
    documents: [
      'Aadhaar Card',
      'Income Certificate',
      'Bank Statement (6 months)',
      'Property Documents',
      'Caste Certificate (if applicable)',
    ],
    applicationSteps: [
      'Visit pmaymis.gov.in',
      'Register with Aadhaar',
      'Fill application form with personal details',
      'Submit income proof',
      'Apply through CLSS portal for subsidy',
      'Track status online',
    ],
    officialUrl: 'https://pmaymis.gov.in',
    processingTime: '60-90 days',
    faqs: [
      { q: 'What is the income limit for PMAY?', a: 'EWS: up to ₹3 lakh, LIG: ₹3-6 lakh, MIG-I: ₹6-12 lakh, MIG-II: ₹12-18 lakh.' },
      { q: 'Can I apply online?', a: 'Yes, through the official PMAY portal or through your bank.' },
    ],
    tags: ['housing', 'home loan', 'subsidy', 'urban', 'rural'],
  },
  {
    id: 'pm-mudra',
    title: 'Pradhan Mantri MUDRA Yojana',
    shortTitle: 'PMMY',
    department: 'Ministry of Finance',
    category: 'Business',
    targets: ['Entrepreneurs', 'Job Seekers'],
    state: 'Central',
    benefit: 'Loans up to ₹10 lakh without collateral',
    financialAssistance: 'Up to ₹10 lakh',
    eligibilityScore: 85,
    deadline: null,
    applicationMode: 'Both',
    isNew: false,
    isTrending: true,
    isHighBenefit: true,
    description:
      'MUDRA Yojana provides micro-finance loans to non-corporate, non-farm small/micro enterprises through three categories: Shishu, Kishore, and Tarun.',
    benefits: [
      'Loans from ₹50,000 to ₹10 lakh',
      'No collateral required',
      'Low interest rates',
      'Three tiers: Shishu, Kishore, Tarun',
    ],
    eligibility: [
      'Non-farm income-generating activities',
      'Small businesses and startups',
      'Manufacturing, trading or service sector',
      'Must not be a defaulter',
    ],
    documents: [
      'Identity Proof (Aadhaar/PAN)',
      'Address Proof',
      'Business Plan',
      'Bank Statement (6 months)',
      'Quotation for machinery/equipment',
    ],
    applicationSteps: [
      'Visit mudra.org.in',
      'Choose loan category (Shishu/Kishore/Tarun)',
      'Download application form',
      'Submit to nearest bank/MFI',
      'Get business verification',
      'Loan disbursed within 7-10 days',
    ],
    officialUrl: 'https://mudra.org.in',
    processingTime: '7-15 days',
    faqs: [
      { q: 'What is Shishu, Kishore, Tarun?', a: 'Shishu: up to ₹50,000 | Kishore: ₹50,000-₹5 lakh | Tarun: ₹5-10 lakh.' },
      { q: 'Is collateral needed?', a: 'No collateral is required for MUDRA loans.' },
    ],
    tags: ['business', 'loan', 'startup', 'msme', 'entrepreneur'],
  },
  {
    id: 'beti-bachao',
    title: 'Beti Bachao Beti Padhao',
    shortTitle: 'BBBP',
    department: 'Ministry of Women & Child Development',
    category: 'Women Empowerment',
    targets: ['Women', 'SC/ST/OBC'],
    state: 'Central',
    benefit: 'Financial support & educational benefits for girls',
    financialAssistance: 'Up to ₹6.71 lakh on maturity',
    eligibilityScore: 92,
    deadline: null,
    applicationMode: 'Both',
    isNew: false,
    isTrending: false,
    isHighBenefit: true,
    description:
      'BBBP aims to address declining child sex ratio and promote welfare of the girl child through education, financial security, and awareness campaigns.',
    benefits: [
      'Sukanya Samriddhi Yojana account',
      'Up to 7.6% interest rate',
      'Tax benefits under Section 80C',
      '₹6.71 lakh maturity for ₹1.5L/year deposit',
    ],
    eligibility: [
      'Girl child below 10 years',
      'Indian citizen',
      'One account per girl child',
      'Maximum two accounts per family',
    ],
    documents: [
      "Girl Child's Birth Certificate",
      "Parent's/Guardian's ID Proof",
      'Address Proof',
      'Passport-size Photos',
    ],
    applicationSteps: [
      'Visit nearest post office or bank',
      'Fill Sukanya Samriddhi Account form',
      'Submit documents',
      'Make initial deposit (min ₹250)',
      'Get passbook issued',
    ],
    officialUrl: 'https://wcd.nic.in',
    processingTime: '1-2 days',
    faqs: [
      { q: 'What is the minimum deposit?', a: 'Minimum ₹250 per year, maximum ₹1.5 lakh per year.' },
      { q: 'When can the amount be withdrawn?', a: 'On maturity at 21 years, or partial withdrawal at 18 for education/marriage.' },
    ],
    tags: ['women', 'girl child', 'education', 'savings', 'financial'],
  },
  {
    id: 'ayushman-bharat',
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
    shortTitle: 'AB-PMJAY',
    department: 'Ministry of Health & Family Welfare',
    category: 'Healthcare',
    targets: ['Below Poverty Line', 'SC/ST/OBC'],
    state: 'Central',
    benefit: '₹5 lakh health coverage per family per year',
    financialAssistance: '₹5 lakh per year',
    eligibilityScore: 90,
    deadline: null,
    applicationMode: 'Both',
    isNew: false,
    isTrending: true,
    isHighBenefit: true,
    description:
      'AB-PMJAY provides health insurance coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization to over 10 crore poor families.',
    benefits: [
      '₹5 lakh health cover per family per year',
      'Covers 1,500+ medical procedures',
      'Cashless treatment at 24,000+ hospitals',
      'Pre and post hospitalization coverage',
    ],
    eligibility: [
      'Listed in SECC 2011 database',
      'BPL families',
      'Occupational criteria from SECC',
      'No cap on family size',
    ],
    documents: [
      'Aadhaar Card',
      'Ration Card',
      'SECC/Socio-Economic Certificate',
      'Mobile Number',
    ],
    applicationSteps: [
      'Visit pmjay.gov.in',
      'Check eligibility with Aadhaar/ration card',
      'Visit nearest Common Service Centre',
      'Get Ayushman Card (Golden Card)',
      'Use card at empanelled hospitals',
    ],
    officialUrl: 'https://pmjay.gov.in',
    processingTime: 'Immediate card issuance',
    faqs: [
      { q: 'How do I check if I am eligible?', a: 'Visit pmjay.gov.in and enter your mobile number or Ration Card number.' },
      { q: 'Is it only for BPL families?', a: 'Primarily BPL/deprived households listed in SECC 2011 data.' },
    ],
    tags: ['health', 'insurance', 'hospital', 'bpl', 'medical'],
  },
  {
    id: 'pm-scholarship',
    title: 'PM Scholarship Scheme',
    shortTitle: 'PMSS',
    department: 'Ministry of Education',
    category: 'Education',
    targets: ['Students'],
    state: 'Central',
    benefit: '₹2,500–₹3,000/month scholarship',
    financialAssistance: '₹36,000 per year',
    eligibilityScore: 82,
    deadline: '2024-10-31',
    applicationMode: 'Online',
    isNew: false,
    isTrending: false,
    isHighBenefit: false,
    description:
      'PMSS provides scholarships to wards and widows of ex-servicemen for professional degree courses, encouraging them to pursue higher education.',
    benefits: [
      '₹3,000/month for boys, ₹3,000/month for girls',
      'For 1st to 4th year courses',
      'Covers professional degree courses',
      'Renewable each year based on performance',
    ],
    eligibility: [
      'Ward or widow of ex-serviceman/coast guard',
      'Enrolled in first year of professional degree',
      'Minimum 60% in 10+2/Diploma',
      'Not receiving any other scholarship',
    ],
    documents: [
      'Aadhaar Card',
      'Mark Sheets (10th & 12th)',
      'College Admission Letter',
      "ESM Certificate (Father's Service Proof)",
      'Bank Account Details',
    ],
    applicationSteps: [
      'Register on ksb.gov.in/KSBPortal',
      'Fill fresh scholarship application',
      'Upload required documents',
      'Submit before deadline',
      'Track status online',
    ],
    officialUrl: 'https://ksb.gov.in',
    processingTime: '30-60 days',
    faqs: [
      { q: 'Who can apply for PMSS?', a: 'Wards and widows of ex-servicemen enrolled in professional degree programs.' },
      { q: 'Is it renewable?', a: 'Yes, it is renewable each year subject to maintaining minimum 50% marks.' },
    ],
    tags: ['education', 'scholarship', 'students', 'degree', 'financial aid'],
  },
  {
    id: 'standup-india',
    title: 'Stand-Up India Scheme',
    shortTitle: 'Stand-Up India',
    department: 'Ministry of Finance',
    category: 'Business',
    targets: ['Women', 'SC/ST/OBC', 'Entrepreneurs'],
    state: 'Central',
    benefit: 'Bank loans from ₹10 lakh to ₹1 crore',
    financialAssistance: '₹10 lakh to ₹1 crore',
    eligibilityScore: 78,
    deadline: null,
    applicationMode: 'Both',
    isNew: false,
    isTrending: false,
    isHighBenefit: true,
    description:
      'Stand-Up India facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST borrower and one woman borrower per bank branch.',
    benefits: [
      'Loans from ₹10 lakh to ₹1 crore',
      'For greenfield enterprises',
      'Composite loan covering 75% of project cost',
      'Repayment up to 7 years',
    ],
    eligibility: [
      'SC/ST or woman entrepreneur',
      'Above 18 years of age',
      'Greenfield enterprise (first-time venture)',
      'Not defaulter with any bank',
    ],
    documents: [
      'Identity & Address Proof',
      'Caste Certificate (SC/ST)',
      'Business Plan',
      'Project Report',
      'Bank Statement',
    ],
    applicationSteps: [
      'Visit standupmitra.in',
      'Register and fill application',
      'Submit business plan',
      'Bank verification',
      'Loan sanction and disbursement',
    ],
    officialUrl: 'https://standupmitra.in',
    processingTime: '15-30 days',
    faqs: [
      { q: 'Can general category women apply?', a: 'Yes, women from any category can apply for Stand-Up India.' },
      { q: 'What is a greenfield enterprise?', a: 'A brand new business venture that the applicant is starting for the first time.' },
    ],
    tags: ['business', 'loan', 'women', 'sc/st', 'startup'],
  },
  {
    id: 'pm-jan-dhan',
    title: 'Pradhan Mantri Jan Dhan Yojana',
    shortTitle: 'PMJDY',
    department: 'Ministry of Finance',
    category: 'Finance',
    targets: ['Below Poverty Line', 'All Citizens'],
    state: 'Central',
    benefit: 'Zero-balance bank account with ₹1 lakh accident insurance',
    financialAssistance: '₹1 lakh accident + ₹30,000 life insurance',
    eligibilityScore: 99,
    deadline: null,
    applicationMode: 'Both',
    isNew: false,
    isTrending: false,
    isHighBenefit: false,
    description:
      'PMJDY ensures access to financial services like banking, credit, insurance, and pension for all unbanked citizens with zero minimum balance.',
    benefits: [
      'Zero balance savings account',
      '₹1 lakh accident insurance cover',
      '₹30,000 life insurance',
      'RuPay debit card',
      'Overdraft up to ₹10,000',
    ],
    eligibility: [
      'Any Indian citizen aged 10 years or above',
      'No existing bank account',
      'Valid ID proof',
    ],
    documents: ['Aadhaar Card', 'Passport Photo', 'Address Proof'],
    applicationSteps: [
      'Visit any bank branch',
      'Fill account opening form',
      'Submit KYC documents',
      'Get RuPay card issued',
    ],
    officialUrl: 'https://pmjdy.gov.in',
    processingTime: '1-2 days',
    faqs: [
      { q: 'What is the minimum balance required?', a: 'Zero minimum balance — account can be maintained with no minimum deposit.' },
    ],
    tags: ['banking', 'finance', 'insurance', 'all citizens'],
  },
];

export const stats = [
  { label: 'Government Schemes', value: '1,200+', icon: 'FileText' },
  { label: 'Citizens Benefited', value: '4.2 Cr+', icon: 'Users' },
  { label: 'States Covered', value: '36', icon: 'MapPin' },
  { label: 'Success Rate', value: '94%', icon: 'TrendingUp' },
];

export const categories: { label: SchemeCategory; icon: string; color: string }[] = [
  { label: 'Agriculture', icon: 'Wheat', color: 'text-green-600 bg-green-50 dark:bg-green-950/40 dark:text-green-400' },
  { label: 'Education', icon: 'GraduationCap', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400' },
  { label: 'Healthcare', icon: 'Heart', color: 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400' },
  { label: 'Housing', icon: 'Home', color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-400' },
  { label: 'Employment', icon: 'Briefcase', color: 'text-slate-600 bg-slate-50 dark:bg-slate-950/40 dark:text-slate-400' },
  { label: 'Women Empowerment', icon: 'Star', color: 'text-pink-600 bg-pink-50 dark:bg-pink-950/40 dark:text-pink-400' },
  { label: 'Business', icon: 'TrendingUp', color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-400' },
  { label: 'Finance', icon: 'Wallet', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400' },
];

export const testimonials = [
  {
    name: 'Ramesh Kumar',
    location: 'Rajasthan',
    role: 'Farmer',
    avatar: 'R',
    color: 'bg-green-500',
    text: 'I had no idea I was eligible for PM-KISAN until I found this platform. Within a week I applied and received ₹2,000 in my account. This app changed my life.',
    scheme: 'PM-KISAN',
    benefit: '₹6,000/year',
  },
  {
    name: 'Priya Sharma',
    location: 'Maharashtra',
    role: 'Student',
    avatar: 'P',
    color: 'bg-blue-500',
    text: 'As a student from a defense background, I found the PM Scholarship scheme here. The AI assistant guided me through every document. Got ₹36,000 scholarship!',
    scheme: 'PM Scholarship',
    benefit: '₹36,000/year',
  },
  {
    name: 'Sunita Devi',
    location: 'Uttar Pradesh',
    role: 'Entrepreneur',
    avatar: 'S',
    color: 'bg-pink-500',
    text: 'Being a woman entrepreneur, Stand-Up India was perfect for me. The AI explained every step in Hindi. I got a ₹15 lakh loan and started my tailoring business.',
    scheme: 'Stand-Up India',
    benefit: '₹15 lakh loan',
  },
  {
    name: 'Arjun Singh',
    location: 'Punjab',
    role: 'Small Business Owner',
    avatar: 'A',
    color: 'bg-orange-500',
    text: 'MUDRA loan through this platform was seamless. The chatbot answered all my questions in minutes. My shop is now thriving after getting ₹5 lakh loan.',
    scheme: 'PM Mudra',
    benefit: '₹5 lakh loan',
  },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Create Your Profile',
    description: 'Answer a few simple questions about your age, income, occupation, and other basic details in our guided profile setup.',
    icon: 'UserPlus',
  },
  {
    step: '02',
    title: 'AI Analyzes Eligibility',
    description: 'Our advanced AI engine instantly scans 1,200+ schemes across all states and departments to find your perfect matches.',
    icon: 'Brain',
  },
  {
    step: '03',
    title: 'View Matched Schemes',
    description: 'See personalized scheme recommendations with eligibility scores, benefits, and documents required — all in one place.',
    icon: 'Sparkles',
  },
  {
    step: '04',
    title: 'Apply with AI Guidance',
    description: 'Follow step-by-step application guidance from our AI assistant. Get help with documents, forms, and tracking.',
    icon: 'CheckCircle',
  },
];

export const faqs = [
  {
    q: 'How does the AI find schemes I am eligible for?',
    a: 'Our AI analyzes your profile (age, income, occupation, category, state, etc.) against the eligibility criteria of 1,200+ government schemes and generates a ranked list of schemes you qualify for.',
  },
  {
    q: 'Is my personal information safe?',
    a: 'Yes. All data is encrypted and stored securely. We never share your personal information with third parties. We comply with India\'s Personal Data Protection standards.',
  },
  {
    q: 'Is this platform free to use?',
    a: 'Yes, the platform is completely free. We are committed to helping every citizen access government benefits without any barrier.',
  },
  {
    q: 'Can I use this in my regional language?',
    a: 'Yes! We support English, Hindi, Telugu, Tamil, Kannada, Marathi, Bengali, and Malayalam. Switch language from the settings menu.',
  },
  {
    q: 'How often is the scheme database updated?',
    a: 'Our database is updated daily by our research team in coordination with official government portals and gazettes. New schemes are added within 24 hours of launch.',
  },
  {
    q: 'Can the AI help me fill application forms?',
    a: 'Yes, our AI assistant can guide you through filling forms, explain requirements, and even help you draft supporting documents like covering letters.',
  },
];

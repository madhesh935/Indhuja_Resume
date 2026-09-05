import type { Project, CapabilityGroup, ApproachStep, ActivityItem } from '../types';

export const PERSONAL_INFO = {
  name: 'INDUJHA',
  fullName: 'Indujha A',
  location: 'Tamil Nadu, India',
  role: 'Data Analytics × Machine Learning × Software Development',
  rolePill: 'Data Analytics • Machine Learning • Software Development',
  email: 'indujhaindujha8@gmail.com',
  phone: '96003 60722',
  linkedin: 'https://www.linkedin.com/in/indujha-a-92b561341/',
  linkedinDisplay: 'linkedin.com/in/indujha-a-92b561341',
  heroParagraph: 'I transform data into meaningful insights and build intelligent digital solutions that solve real-world problems.',
  heroHighlightStrip: [
    'B.Sc. CS + Data Analytics',
    '83%',
    'Python',
    'SQL',
    'Machine Learning',
    'Power BI'
  ]
};

export const ABOUT_DATA = {
  label: 'ABOUT ME',
  title: 'Turning Data Into Decisions',
  paragraphs: [
    'I’m Indujha, a B.Sc. Computer Science with Data Analytics student passionate about discovering meaningful patterns in data and transforming them into useful digital solutions.',
    'My interests sit at the intersection of Data Analytics, Machine Learning and Software Development. I enjoy working across the complete problem-solving process — from cleaning and interpreting data to building visualizations, predictive solutions and web applications.',
    'I’m currently focused on strengthening my practical experience and building solutions that use technology to address real operational problems.'
  ],
  quote: {
    line1: 'Driven by data.',
    line2: 'Inspired by',
    line3: 'real-world impact.'
  },
  attributes: [
    { title: 'Curious Learner', description: 'Consistently exploring new architectures and analytical paradigms.' },
    { title: 'Problem Solver', description: 'Translating ambiguous problem statements into structured logic.' },
    { title: 'Team Player', description: 'Effective collaborator across technical and operational domains.' },
    { title: 'Always Exploring', description: 'Testing modern frameworks, AI algorithms, and visualization tools.' }
  ]
};

export const CAPABILITIES: CapabilityGroup[] = [
  {
    id: 'data-analytics',
    number: '01',
    title: 'DATA & ANALYTICS',
    iconName: 'Database',
    skills: [
      'Data Analysis',
      'Data Cleaning',
      'Data Interpretation',
      'SQL / MySQL',
      'Predictive Analytics'
    ]
  },
  {
    id: 'development',
    number: '02',
    title: 'DEVELOPMENT',
    iconName: 'Code',
    skills: [
      'Python',
      'JavaScript',
      'HTML / CSS',
      'Flask',
      'Git & GitHub',
      'VS Code'
    ]
  },
  {
    id: 'ai-ml',
    number: '03',
    title: 'AI & MACHINE LEARNING',
    iconName: 'BrainCircuit',
    skills: [
      'Machine Learning',
      'ML Fundamentals',
      'Predictive Analytics',
      'Data-driven Solutions'
    ]
  },
  {
    id: 'visualization',
    number: '04',
    title: 'VISUALIZATION',
    iconName: 'BarChart3',
    skills: [
      'Power BI',
      'Microsoft Excel',
      'D3.js',
      'Dashboard Design'
    ]
  }
];

export const FEATURED_PROJECT: Project = {
  id: 'garment-production-planner',
  featured: true,
  title: 'AI-Based Garment Production and Planning Software',
  subtitle: 'AI-ASSISTED PRODUCTION MANAGEMENT | CAPSTONE PROJECT',
  category: 'Full-Stack Analytics & Planning',
  description: 'A web-based production planning platform designed to simplify garment manufacturing operations through structured planning, automation and operational analytics.',
  capabilities: [
    'Order Management',
    'Production Planning',
    'Resource Allocation',
    'Requirements Estimation',
    'Workflow Tracking',
    'Operational Analytics'
  ],
  techStack: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript'],
  linkText: 'Project Details →'
};

export const OTHER_PROJECT: Project = {
  id: 'gym-management-system',
  featured: false,
  title: 'Gym Management System',
  subtitle: 'DESKTOP ADMINISTRATIVE APPLICATION',
  category: 'Python Application',
  description: 'A Python-based member management application designed to simplify gym record administration.',
  capabilities: [
    'Member Registration',
    'Smart Search & Filter',
    'Record Management',
    'Structured Administration'
  ],
  features: [
    {
      title: 'Member Registration',
      description: 'Create and maintain structured member records seamlessly.'
    },
    {
      title: 'Smart Search',
      description: 'Retrieve member details quickly with indexed parameters.'
    },
    {
      title: 'Record Management',
      description: 'Add and remove member information including name, age, and membership type.'
    }
  ],
  techStack: ['Python'],
  linkText: 'Application Details →'
};

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    description: 'Define the problem and identify useful data.'
  },
  {
    number: '02',
    title: 'ANALYZE',
    description: 'Clean, explore and interpret information.'
  },
  {
    number: '03',
    title: 'BUILD',
    description: 'Develop analytical, ML or software solutions.'
  },
  {
    number: '04',
    title: 'VISUALIZE',
    description: 'Turn results into understandable dashboards.'
  },
  {
    number: '05',
    title: 'IMPROVE',
    description: 'Iterate based on outcomes and feedback.'
  }
];

export const EDUCATION_DATA = {
  degree: 'B.Sc. Computer Science with Data Analytics',
  institution: 'KPR College of Arts Science and Research',
  location: 'Tamil Nadu, India',
  score: '83%',
  scoreLabel: 'Academic Score',
  details: 'Comprehensive coursework in Data Analytics, Database Management Systems, Machine Learning Foundations, Python Programming, and Statistical Data Interpretation.'
};

export const BEYOND_CLASSROOM_ITEMS: ActivityItem[] = [
  {
    id: 'events',
    title: 'Technical Events',
    category: 'Engagement',
    description: 'Active participation in collegiate technical symposiums, coding challenges, and analytics workshops.'
  },
  {
    id: 'presentations',
    title: 'Project Presentations',
    category: 'Communication',
    description: 'Presenting research concepts, application architectures, and operational workflows to technical faculties and peers.'
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    category: 'Applied Practice',
    description: 'Hands-on exploratory data analysis, data sanitization, correlation discovery, and business insight extraction.'
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    category: 'Algorithms',
    description: 'Investigating supervised learning algorithms, predictive feature selection, and data-driven pattern recognition.'
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    category: 'Engineering',
    description: 'Structuring clean frontend interfaces and backend Flask routines to power usable digital utilities.'
  }
];

export const SOFT_SKILLS = [
  'PROBLEM SOLVING',
  'ANALYTICAL THINKING',
  'COMMUNICATION',
  'TEAMWORK',
  'TIME MANAGEMENT',
  'ADAPTABILITY',
  'QUICK LEARNING'
];

export const TECH_MARQUEE = [
  'PYTHON',
  'SQL',
  'POWER BI',
  'FLASK',
  'MYSQL',
  'JAVASCRIPT',
  'D3.JS',
  'GITHUB'
];

export const FLOW_MARQUEE = [
  'DATA',
  'INSIGHT',
  'DECISION',
  'IMPACT'
];

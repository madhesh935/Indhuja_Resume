import type { Project, CapabilityGroup, ApproachStep, ActivityItem } from '../types';

export const PERSONAL_INFO = {
  name: 'INDUJHA',
  fullName: 'Indujha A',
  location: 'Tamil Nadu, India',
  role: 'Data Analytics × Machine Learning × Software Development',
  rolePill: 'DATA ANALYTICS • MACHINE LEARNING • SOFTWARE DEVELOPMENT',
  email: 'indujhaindujha8@gmail.com',
  phone: '96003 60722',
  phoneFormatted: '+91 96003 60722',
  linkedin: 'https://www.linkedin.com/in/indujha-a-92b561341/',
  linkedinDisplay: 'linkedin.com/in/indujha-a-92b561341',
  heroStatement: {
    line1: 'I turn data into insight',
    line2: 'and ideas into intelligent solutions.'
  },
  heroSecondary: 'B.Sc. Computer Science with Data Analytics student exploring how data, machine learning and software can be transformed into practical solutions for real-world problems.',
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
  label: '01 / ABOUT',
  title: 'Turning Data Into Decisions.',
  paragraphs: [
    'I’m Indujha, a Computer Science with Data Analytics student who enjoys transforming raw information into meaningful insights and practical digital solutions.',
    'My interests span data analysis, predictive analytics, machine learning and software development. I enjoy the complete problem-solving cycle — from cleaning and interpreting data to developing applications and presenting results through clear visualizations.',
    'I’m currently building practical projects that strengthen my analytical thinking, technical confidence and ability to solve real-world problems using data and software.'
  ],
  quote: 'I believe good solutions begin with clear thinking, useful data, and a strong focus on practical outcomes.',
  areasOfInterest: [
    { name: 'Data Analytics', icon: 'BarChart3' },
    { name: 'Machine Learning', icon: 'Brain' },
    { name: 'Software Development', icon: 'Code2' },
    { name: 'Problem Solving', icon: 'Lightbulb' },
    { name: 'Visualization', icon: 'Layout' }
  ],
  statement: {
    line1: 'DRIVEN BY DATA.',
    line2: 'FOCUSED ON',
    highlight: 'USEFUL OUTCOMES.',
    caption: 'Core Guiding Principle'
  },
  qualities: [
    {
      title: 'ANALYTICAL THINKER',
      description: 'Breaks complex information into structured and understandable insights.'
    },
    {
      title: 'PROBLEM SOLVER',
      description: 'Approaches technical challenges with logical and practical solutions.'
    },
    {
      title: 'COLLABORATIVE LEARNER',
      description: 'Comfortable presenting ideas, sharing knowledge and working with others.'
    },
    {
      title: 'CONTINUOUS EXPLORER',
      description: 'Actively strengthening skills across analytics, ML and software development.'
    }
  ]
};

export const GLOBE_FLOATING_CARDS = [
  {
    id: 'analyze',
    title: 'ANALYZE',
    subtitle: 'Data to find patterns',
    icon: 'BarChart3'
  },
  {
    id: 'learn',
    title: 'LEARN',
    subtitle: 'Turn information into knowledge',
    icon: 'BookOpen'
  },
  {
    id: 'build',
    title: 'BUILD',
    subtitle: 'Create practical solutions',
    icon: 'Cpu'
  },
  {
    id: 'visualize',
    title: 'VISUALIZE',
    subtitle: 'Communicate insights',
    icon: 'Layers'
  },
  {
    id: 'impact',
    title: 'IMPACT',
    subtitle: 'Solve real-world problems',
    icon: 'Target'
  }
];

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
      'HTML',
      'CSS',
      'Flask',
      'Git',
      'GitHub',
      'VS Code'
    ]
  },
  {
    id: 'ai-ml',
    number: '03',
    title: 'AI & MACHINE LEARNING',
    iconName: 'BrainCircuit',
    skills: [
      'Machine Learning Fundamentals',
      'Predictive Analytics',
      'Data-driven Problem Solving'
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
  title: 'AI-Based Garment Production & Planning Software',
  subtitle: 'PRODUCTION PLANNING • ANALYTICS • AUTOMATION',
  category: 'FEATURED CAPSTONE',
  description: 'A web-based production planning system designed to organize key garment-manufacturing activities into one connected workflow.',
  challenge: 'Production planning involves coordinating orders, manpower, machines, fabric requirements, schedules and workflow progress. Managing these activities separately can make planning and monitoring difficult.',
  whatIBuilt: 'A centralized application combining order management, production planning, resource allocation, workflow tracking and operational dashboards.',
  capabilities: [
    'Order Management',
    'Production Planning',
    'Resource Allocation',
    'Workflow Tracking',
    'Manpower Estimation',
    'Machine Requirement Estimation',
    'Fabric Requirement Estimation',
    'Production Scheduling',
    'Operational Analytics'
  ],
  myContribution: 'Developed application components using Python and Flask, created the web interface using HTML, CSS and JavaScript, and designed dashboards for monitoring production activities and order status.',
  learnings: 'Developing the project strengthened practical understanding of application structuring, production-planning logic, dashboard design and translating operational requirements into software features.',
  techStack: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript'],
  linkText: 'View Case Study →'
};

export const OTHER_PROJECT: Project = {
  id: 'gym-management-system',
  featured: false,
  title: 'Gym Management System',
  subtitle: 'PYTHON APPLICATION DEVELOPMENT',
  category: 'SECOND PROJECT',
  description: 'A lightweight member-management application designed to simplify everyday gym administration.',
  capabilities: [
    'Member Registration',
    'Smart Search & Filter',
    'Record Administration',
    'Data Management'
  ],
  features: [
    {
      title: '01 / REGISTER',
      description: 'Create and maintain structured member records.'
    },
    {
      title: '02 / SEARCH',
      description: 'Quickly retrieve member information.'
    },
    {
      title: '03 / MANAGE',
      description: 'Add and remove member information including name, age and membership type.'
    }
  ],
  myContribution: 'Designed and implemented the core member-management functionality using Python.',
  techStack: ['Python'],
  linkText: 'View Project Details →'
};

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Understand the problem and identify useful information.'
  },
  {
    number: '02',
    title: 'PREPARE',
    description: 'Clean and structure data for analysis.'
  },
  {
    number: '03',
    title: 'ANALYZE',
    description: 'Explore patterns and interpret results.'
  },
  {
    number: '04',
    title: 'BUILD',
    description: 'Develop analytical, machine-learning or software solutions.'
  },
  {
    number: '05',
    title: 'COMMUNICATE',
    description: 'Transform results into clear dashboards and understandable insights.'
  }
];

export const EDUCATION_DATA = {
  label: '05 / EDUCATION',
  heading: 'Academic Foundation',
  subtitle: 'Building a strong base in computer science, analytics, programming, databases and data-driven problem solving.',
  degree: 'B.Sc. Computer Science with Data Analytics',
  institution: 'KPR College of Arts Science and Research',
  location: 'Tamil Nadu',
  score: '83%',
  academicFocus: {
    label: 'ACADEMIC FOCUS',
    text: 'Building a foundation across computer science, analytics, databases, programming and data-driven problem solving.',
    tags: ['Computer Science', 'Data Analytics', 'Programming', 'Databases', 'Problem Solving'],
    quote: '“A STRONG FOUNDATION FOR A BRIGHTER TOMORROW.”'
  },
  scoreModule: {
    label: 'ACADEMIC SNAPSHOT',
    score: '83%',
    scoreLabel: 'Academic Score',
    verifiedBadge: 'Verified Academic Score: 83%',
    orbitingPills: [
      { name: 'COMPUTER SCIENCE', icon: 'Monitor' },
      { name: 'DATA ANALYTICS', icon: 'BarChart3' },
      { name: 'PROGRAMMING', icon: 'Code2' },
      { name: 'DATABASES', icon: 'Database' }
    ]
  },
  featureCard: {
    label: 'MORE THAN A DEGREE',
    text: 'A learning journey that shapes my analytical thinking and technical perspective.'
  },
  metricCards: [
    {
      title: 'ACADEMIC STRENGTH',
      description: 'Structured learning across technical and analytical disciplines.',
      icon: 'BarChart3'
    },
    {
      title: 'LEARNING APPROACH',
      description: 'Focused on building practical understanding through projects and application.',
      icon: 'Lightbulb'
    },
    {
      title: 'GROWTH DIRECTION',
      description: 'Developing confidence in data analytics, software and machine learning fundamentals.',
      icon: 'ArrowUpRight'
    }
  ],
  footer: {
    left: '| KNOWLEDGE BUILDS CAPABILITY. CURIOSITY DRIVES GROWTH.',
    right: 'DATA FUELS A BRIGHTER TOMORROW — INDUJHA'
  }
};

export const GROWTH_CARDS: ActivityItem[] = [
  {
    id: 'technical-learning',
    title: 'TECHNICAL LEARNING',
    category: 'Skill Building',
    description: 'Continuously developing practical skills across Data Analytics, Machine Learning, Python, SQL and Software Development.'
  },
  {
    id: 'project-presentation',
    title: 'PROJECT PRESENTATION',
    category: 'Communication',
    description: 'Building confidence in communicating project ideas, technical approaches and developed solutions.'
  },
  {
    id: 'hands-on-development',
    title: 'HANDS-ON DEVELOPMENT',
    category: 'Application',
    description: 'Applying classroom concepts through practical software and data-driven projects.'
  },
  {
    id: 'continuous-growth',
    title: 'CONTINUOUS GROWTH',
    category: 'Evolution',
    description: 'Exploring tools, technologies and problem-solving methods through consistent practice.'
  }
];

export const EXPLORING_TERMS = [
  'DATA ANALYTICS',
  'MACHINE LEARNING',
  'PREDICTIVE ANALYTICS',
  'POWER BI',
  'PYTHON',
  'DATA VISUALIZATION',
  'SOFTWARE DEVELOPMENT'
];

export const SOFT_SKILLS = [
  { name: 'ANALYTICAL THINKING', isHighlighted: true },
  { name: 'PROBLEM SOLVING', isHighlighted: true },
  { name: 'COMMUNICATION', isHighlighted: false },
  { name: 'TEAMWORK', isHighlighted: false },
  { name: 'TIME MANAGEMENT', isHighlighted: false },
  { name: 'ADAPTABILITY', isHighlighted: false },
  { name: 'QUICK LEARNING', isHighlighted: false }
];

export const TECH_MARQUEE = [
  'PYTHON',
  'SQL',
  'POWER BI',
  'MYSQL',
  'FLASK',
  'JAVASCRIPT',
  'D3.JS',
  'MACHINE LEARNING',
  'GITHUB'
];

export const FLOW_MARQUEE = [
  'DATA',
  'INSIGHT',
  'DECISION',
  'IMPACT'
];

export const FLOATING_HERO_LABELS = [
  { text: 'DATA', top: '20%', left: '4%', delay: 0 },
  { text: 'PATTERNS', top: '30%', right: '2%', delay: 1.5 },
  { text: 'INSIGHTS', bottom: '22%', left: '3%', delay: 3 },
  { text: 'IMPACT', bottom: '12%', right: '4%', delay: 4.5 }
];


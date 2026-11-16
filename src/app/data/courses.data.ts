export interface TechStackItem {
  id: string;
  name: string;
  category: string;
  color: string;
  svg: string;
}

export interface InternshipProgram {
  id: string;
  title: string;
  duration: string;
  badge: string;
  description: string;
  highlights: string[];
  recommendedFor: string;
}

export interface TrainingCourseCategory {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  courses: {
    title: string;
    description: string;
    topics: string[];
  }[];
}

export interface TrainingDurationPlan {
  id: string;
  title: string;
  duration: string;
  badge: string;
  isPopular?: boolean;
  focus: string;
  deliverables: string[];
  features: string[];
}

export interface ProjectWorkflowStep {
  step: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface WhyChooseItem {
  title: string;
  description: string;
  icon: string;
}

export const TECH_STACK_ITEMS: TechStackItem[] = [
  {
    id: 'dotnet',
    name: 'ASP.NET Core',
    category: 'Backend',
    color: '#512BD4',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="60" fill="#512BD4"/><path d="M36 84V44h11c6.6 0 11.5 1.8 14.8 5.4 3.3 3.6 5 8.4 5 14.6 0 6.2-1.7 11-5 14.6-3.3 3.6-8.2 5.4-14.8 5.4H36zm8.8-7.7h2.2c4.1 0 7.1-1.2 9-3.7 1.9-2.5 2.9-5.7 2.9-9.8 0-4.1-1-7.4-2.9-9.8-1.9-2.5-4.9-3.7-9-3.7h-2.2v27zM71 78.4c1.8 0 3.2 1.4 3.2 3.2 0 1.8-1.4 3.2-3.2 3.2-1.8 0-3.2-1.4-3.2-3.2 0-1.8 1.4-3.2 3.2-3.2zm21-34.4v7.7H78.8v8.6h11.4v7.7H78.8v8.6h13.2v7.7H70V44h22z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'csharp',
    name: 'C#',
    category: 'Language',
    color: '#239120',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M64 4l52 30v60L64 124 12 94V34L64 4z" fill="#9B4993"/><path d="M64 15.5L103.5 38v45L64 105.5 24.5 83V38L64 15.5z" fill="#239120"/><path d="M57 44.5c-11 0-19.5 8.7-19.5 19.5s8.5 19.5 19.5 19.5c6.2 0 11.6-2.8 15.2-7.2l-6.5-5.2c-2.1 2.7-5.1 4.4-8.7 4.4-6.6 0-11.5-5.2-11.5-11.5 0-6.3 4.9-11.5 11.5-11.5 3.6 0 6.6 1.7 8.7 4.4l6.5-5.2c-3.6-4.4-9-7.2-15.2-7.2zm28.5 8.5v6.5h-5.5v5.5h5.5v5.5h-5.5v5.5h5.5v6.5h6.5v-6.5h5.5v6.5h6.5v-6.5h5.5v-5.5h-5.5v-5.5h5.5V65h-5.5v-5.5h6.5V53h-6.5v-5.5h-6.5V53h-5.5v-5.5h-6.5V53zm6.5 12h5.5v5.5H92V65z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'Frontend',
    color: '#DD0031',
    svg: `<svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" fill="#DD0031"/><polygon points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 203.9,186.3 218.1,63.2" fill="#C3002F"/><path d="M125,52.1L66.8,182.6H91.6L103.5,153.4H146.4L158.4,182.6H183.2L125,52.1ZM138.8,134.8H111.1L125,101.4L138.8,134.8Z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    color: '#339933',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M64 8l54 31.2v62.4L64 123 10 92.8V31.2L64 8z" fill="#339933"/><path d="M64 42c-12 0-20 7-20 17 0 14 18 13 18 20 0 3-3 5-7 5-5 0-8-2-10-5l-5 4c3 4 8 7 15 7 11 0 19-6 19-17 0-14-18-13-18-20 0-3 3-4 6-4 4 0 7 2 9 4l5-5c-3-3-8-6-14-6zm23 0v43h6.5V42H87z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Language',
    color: '#EA2D42',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M49 84c17 4 33-1 33-1s-4 4-13 7c-9 2-25 2-35-1 0 0 4-3 15-5zm-2 15c13 3 26-1 26-1s-3 3-10 5c-7 2-20 2-28-1 0 0 3-2 12-3zm44-64c4 9-2 18-9 22 7-1 12-5 14-9 4-7 1-17-5-23-2 3-1 7 0 10zm-33 7c-5 13 4 23 14 31 3 2 6 4 9 7 2-3 2-6 1-9-4-6-10-10-14-16-6-7-10-13-10-13zm-9 6c-2 6 1 12 5 17 4 5 10 10 15 15 2-4 2-7 1-11-3-6-8-10-11-15-4-5-8-6-10-6zm26 60s5-1 7-3c7-4 7-13-1-17-7-3-15 0-21 3-9 4-17 3-17 3s6 2 11 1c7-1 14-4 20-1 6 3 3 8-1 10-6 3-13 2-13 2s6 3 15 2z" fill="#EA2D42"/></svg>`
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Language',
    color: '#3776AB',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M63.5 12c-27 0-25.3 11.7-25.3 11.7l.03 12.1h25.7v3.6H25.4S12 37.9 12 64.7c0 26.8 11.7 25.8 11.7 25.8h7v-9.8c0-11.2 9.6-11.2 9.6-11.2h25.4c10.8 0 10.3-10.3 10.3-10.3V19.7S77.2 12 63.5 12zm-7.3 7.3a4.2 4.2 0 110 8.4 4.2 4.2 0 010-8.4z" fill="#3776AB"/><path d="M64.5 116c27 0 25.3-11.7 25.3-11.7l-.03-12.1H64.1v-3.6h38.5s13.4 1.5 13.4-25.3c0-26.8-11.7-25.8-11.7-25.8h-7v9.8c0 11.2-9.6 11.2-9.6 11.2H62.3c-10.8 0-10.3 10.3-10.3 10.3v39.5s-1.2 7.7 12.5 7.7zm7.3-7.3a4.2 4.2 0 110-8.4 4.2 4.2 0 010 8.4z" fill="#FFD43B"/></svg>`
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    color: '#336791',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M64 12C35.3 12 12 35.3 12 64c0 28.7 23.3 52 52 52s52-23.3 52-52c0-28.7-23.3-52-52-52zm24.7 66.8c-2.3 8.3-9.4 14.5-17.9 15.6-3.8.5-7.7-.2-11.2-2.1l-1.9 4.8c-.8 2.1-2.9 3.5-5.2 3.5h-5.8v-7.2h4.5l1.6-4.1c-4.4-4-7-9.6-7-15.6 0-11.8 9.6-21.4 21.4-21.4 6 0 11.4 2.5 15.3 6.6 4.1 4.3 6.4 10.1 6.2 16.2 0 1.2-.1 2.5-.4 3.7z" fill="#336791"/><circle cx="56" cy="54" r="3" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    category: 'Frontend',
    color: '#7952B3',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="28" fill="#7952B3"/><path d="M43 36h24.8c6.6 0 11.7 1.5 15.2 4.4 3.5 2.9 5.3 7 5.3 12.3 0 4-1.2 7.3-3.6 9.8-2.4 2.5-5.8 4.2-10.2 4.9 5.3.8 9.3 2.7 12 5.6 2.7 2.9 4.1 6.8 4.1 11.7 0 6.1-2.1 10.8-6.2 14.2-4.1 3.4-9.8 5.1-17.1 5.1H43V36zm14.8 24.3h8.6c3.1 0 5.4-.7 6.8-2 1.4-1.3 2.1-3.2 2.1-5.6 0-2.3-.7-4.1-2.1-5.4-1.4-1.3-3.7-1.9-6.8-1.9h-8.6v14.9zm0 33.6h9.8c3.5 0 6.1-.8 7.7-2.3 1.6-1.5 2.5-3.6 2.5-6.3 0-2.6-.8-4.7-2.5-6.2-1.6-1.5-4.2-2.3-7.7-2.3h-9.8v17.1z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend',
    color: '#E34F26',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 116L9 4h110l-10 112-45 12-45-12z" fill="#E34F26"/><path d="M64 117l36-10 8-92H64v102z" fill="#EF652A"/><path d="M64 53H45l-2-21h42l-1-11H31l5 53h28V53zm0 37.6l-.2.1-16.3-4.4-1-11.3H35.4l2 22.4 26.6 7.4V90.6z" fill="#ECECEC"/><path d="M64 53h19l-2 22-17 4.6V91l26.6-7.4 3-33.6 1-11H64V53z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Frontend',
    color: '#1572B6',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 116L9 4h110l-10 112-45 12-45-12z" fill="#1572B6"/><path d="M64 117l36-10 8-92H64v102z" fill="#33A9DC"/><path d="M64 52.8H45l-2-20.9h42.1l-1-11H31.1l5 52.8H64V52.8zm0 37.8l-.2.1-16.3-4.4-1-11.3H35.4l2 22.4 26.6 7.4V90.6z" fill="#ECECEC"/><path d="M64 52.8h19l-1.8 22-17.2 4.6V91l26.6-7.4 3-33.6 1-11H64v11z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    color: '#F7DF1E',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" fill="#F7DF1E"/><path d="M37 104c3.5 2.1 7.8 3.5 12.5 3.5 10.7 0 16.5-5.3 16.5-16.3V44h-12v47.2c0 4.6-2.2 7-6.5 7-3.2 0-6.1-1.3-8.2-2.9l-2.3 8.7zm46.5 3.5c14.2 0 23.3-7.5 23.3-19.7 0-11-7.2-16-16.8-20.1l-3.5-1.5c-5.2-2.2-7.8-4.2-7.8-7.5 0-3.3 2.7-5.5 7.2-5.5 4.3 0 7.7 1.6 10.3 3.6l4.2-8.4c-4-2.6-8.8-4.2-14.7-4.2-12.8 0-21.4 7.2-21.4 18.7 0 10.3 6.6 15.3 16.1 19.4l3.5 1.5c5.7 2.4 8.7 4.7 8.7 8.4 0 4-3.5 6.4-8.8 6.4-5.5 0-9.8-2.2-13.1-4.9l-4.5 8.7c4.6 3.4 10.8 5.5 17.5 5.5z" fill="#000000"/></svg>`
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    color: '#3178C6',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="8" fill="#3178C6"/><path d="M33 55.4h37.5V66H57.7v44.2H45.8V66H33V55.4zm39.7 34.4c3.8 2.3 8.3 3.9 13.5 3.9 6.2 0 9.8-2.9 9.8-7.1 0-4.3-3.3-6.5-10.2-9.4-9.3-3.9-14.8-8.8-14.8-17.4 0-10.2 8.3-17.5 21.6-17.5 5.7 0 10.9 1.4 14.8 3.7l-3.3 9.4c-3.3-1.8-7.3-3.1-11.6-3.1-6.1 0-8.9 2.9-8.9 6.4 0 4.1 3.2 6.1 9.8 8.8 9.9 4.1 15.3 9.1 15.3 18.2 0 11.2-8.9 17.9-22.9 17.9-6.7 0-12.8-1.7-16.7-4.2l3.6-9.6z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    color: '#FF9900',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 55.4c-6.8 0-11 3.5-11 9.6 0 6.5 4.3 9.5 10.5 9.5 4.7 0 8.8-2 11.5-5.5v4.5h8.8V44.5h-8.8v4.9c-2.8-3.5-6.8-5-11-5zm2.1 16c-3.7 0-5.9-1.9-5.9-5.3 0-3.4 2.2-5.3 5.9-5.3 3.4 0 6 1.8 6 5.3 0 3.5-2.6 5.3-6 5.3zm23.8 2.2h8.8l4.8-20.7 4.8 20.7h8.8l7.6-28.1h-8.6l-3.8 17.4-4.8-17.4h-7.8l-4.8 17.4-3.8-17.4h-8.6l7.6 28.1zm41.3-11.8c-2.4-1.3-4.8-2.1-7.2-2.9-2.5-.9-3.8-1.6-3.8-2.7 0-1.1 1.2-1.9 3.2-1.9 2 0 4.4.8 6.7 2.2l3.8-6.1c-2.9-2-6.5-3.1-10.7-3.1-7.2 0-11.8 3.9-11.8 9.9 0 4.5 2.6 7.3 7.8 9.2 2.7 1 5.3 1.9 7.4 2.8 2.1.9 3.2 1.8 3.2 3.1 0 1.4-1.5 2.3-4 2.3-2.9 0-6.1-1.2-8.8-3.4l-4.2 6.4c3.5 2.7 8 4.1 13 4.1 7.9 0 12.8-4.2 12.8-10.5 0-4.6-2.8-7.5-7.4-9.5z" fill="#232F3E"/><path d="M21 93c26.5 17 62.5 15.6 86-3.5-2-.6-3.9-1.3-5.5-2.3 8.3-1.6 15.7-1 16.5-1.5 0 0-2 7.5-8.5 13.5-1.5-1.3-2.8-2.6-3.9-4-26.6 21.6-67 19.5-84.6-2.2z" fill="#FF9900"/></svg>`
  },
  {
    id: 'cloud',
    name: 'VPS & Cloud Hosting',
    category: 'Cloud',
    color: '#0284C7',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="24" width="92" height="24" rx="4" fill="#0284C7"/><circle cx="32" cy="36" r="4" fill="#38BDF8"/><circle cx="44" cy="36" r="4" fill="#38BDF8"/><rect x="80" y="34" width="18" height="4" rx="2" fill="#FFFFFF"/><rect x="18" y="52" width="92" height="24" rx="4" fill="#0369A1"/><circle cx="32" cy="64" r="4" fill="#38BDF8"/><circle cx="44" cy="64" r="4" fill="#38BDF8"/><rect x="80" y="62" width="18" height="4" rx="2" fill="#FFFFFF"/><rect x="18" y="80" width="92" height="24" rx="4" fill="#075985"/><circle cx="32" cy="92" r="4" fill="#38BDF8"/><circle cx="44" cy="92" r="4" fill="#38BDF8"/><rect x="80" y="90" width="18" height="4" rx="2" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    category: 'Advanced',
    color: '#8B5CF6',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="34" r="14" fill="#8B5CF6"/><circle cx="34" cy="84" r="14" fill="#A78BFA"/><circle cx="94" cy="84" r="14" fill="#A78BFA"/><circle cx="64" cy="94" r="10" fill="#C4B5FD"/><line x1="64" y1="48" x2="34" y2="70" stroke="#7C3AED" stroke-width="4"/><line x1="64" y1="48" x2="94" y2="70" stroke="#7C3AED" stroke-width="4"/><line x1="34" y1="84" x2="64" y2="94" stroke="#7C3AED" stroke-width="4"/><line x1="94" y1="84" x2="64" y2="94" stroke="#7C3AED" stroke-width="4"/><circle cx="64" cy="34" r="6" fill="#FFFFFF"/><circle cx="34" cy="84" r="6" fill="#FFFFFF"/><circle cx="94" cy="84" r="6" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    category: 'Advanced',
    color: '#10B981',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="74" width="18" height="36" rx="4" fill="#34D399"/><rect x="42" y="52" width="18" height="58" rx="4" fill="#10B981"/><rect x="66" y="36" width="18" height="74" rx="4" fill="#059669"/><rect x="90" y="20" width="18" height="90" rx="4" fill="#047857"/><path d="M26 62l24-16 24 8 26-26" stroke="#F59E0B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="100" cy="28" r="4" fill="#F59E0B"/></svg>`
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Development',
    category: 'Mobile',
    color: '#0EA5E9',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="34" y="14" width="60" height="100" rx="12" fill="#0EA5E9"/><rect x="40" y="26" width="48" height="72" rx="4" fill="#FFFFFF"/><circle cx="64" cy="106" r="4" fill="#FFFFFF"/><rect x="54" y="18" width="20" height="3" rx="1.5" fill="#38BDF8"/></svg>`
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Mobile',
    color: '#02569B',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M78 12L31 59l16 16 63-63H78z" fill="#02569B"/><path d="M78 64L50 92l28 28h32L82 92l28-28H78z" fill="#0175C2"/><path d="M50 92l16 16 16-16-16-16-16 16z" fill="#29B6F6"/></svg>`
  }
];

export const INTERNSHIP_PROGRAMS: InternshipProgram[] = [
  {
    id: 'internship-6m',
    title: '6 Months Internship',
    duration: '6 Months',
    badge: 'Practical Project Immersion',
    description: 'Designed for students and fresh graduates seeking hands-on exposure to production software development, team collaboration, and real-world system architecture.',
    highlights: [
      'Duration: 6 Months',
      'Practical software development experience.',
      'Work on live projects.',
      'Learn real development workflows.',
      'Understand frontend and backend integration.',
      'Database management and API development.',
      'Version control and deployment basics.',
      'Practical project-based learning.'
    ],
    recommendedFor: 'College students, diploma holders, and fresh graduates preparing for developer roles.'
  },
  {
    id: 'internship-12m',
    title: '12 Months Internship',
    duration: '12 Months',
    badge: 'End-to-End Engineering Exposure',
    description: 'An in-depth, multi-phase technical internship offering extended practical exposure across full-stack architectures, database scaling, cloud deployments, and software maintenance.',
    highlights: [
      'Duration: 12 Months',
      'Extended practical development experience.',
      'Work on real-world software projects.',
      'Advanced technology training.',
      'Full-stack development exposure.',
      'Database architecture and API integration.',
      'Cloud deployment and server management.',
      'Professional development workflow.',
      'End-to-end project implementation experience.'
    ],
    recommendedFor: 'Aspiring professional full-stack engineers and candidates seeking comprehensive industry portfolio work.'
  }
];

export const TRAINING_CATEGORIES: TrainingCourseCategory[] = [
  {
    id: 'backend',
    name: 'Backend Development',
    tagline: 'High-performance server-side architectures, microservices & enterprise logic',
    icon: '⚡',
    courses: [
      {
        title: 'ASP.NET Core',
        description: 'Modern enterprise Web API architecture, dependency injection, Entity Framework Core, middleware pipeline, and JWT authentication.',
        topics: ['C# .NET 8 / 9', 'Web APIs', 'EF Core', 'Authentication & JWT', 'Swagger Documentation']
      },
      {
        title: 'C# Programming',
        description: 'Object-oriented programming, LINQ queries, asynchronous programming (async/await), generics, and design patterns.',
        topics: ['OOP Principles', 'LINQ & Collections', 'Async/Await', 'Delegates & Events', 'Unit Testing']
      },
      {
        title: 'Node.js',
        description: 'Event-driven JavaScript runtime, Express.js REST API creation, middleware handling, asynchronous I/O, and npm ecosystem.',
        topics: ['Node.js Runtime', 'Express.js', 'REST API Architecture', 'JWT & Bcrypt', 'MongoDB / SQL Integration']
      },
      {
        title: 'Java Programming',
        description: 'Core Java fundamentals, collections framework, multi-threading, stream API, and foundations for enterprise Spring Boot services.',
        topics: ['Core Java OOP', 'Collections & Generics', 'Streams & Lambdas', 'Exception Handling', 'JDBC & DB Connectivity']
      },
      {
        title: 'Python Programming',
        description: 'Python syntax, data structures, scripting, REST API development with FastAPI/Flask, automation, and backend utilities.',
        topics: ['Python Core', 'Data Structures', 'FastAPI / Flask', 'File Handling & JSON', 'Database Integration']
      }
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    tagline: 'Responsive client applications, interactive UI state & component architecture',
    icon: '🎨',
    courses: [
      {
        title: 'Angular',
        description: 'Component architecture, standalone components, reactive forms, RxJS observables, dependency injection, and router guards.',
        topics: ['Components & Directives', 'RxJS & Signals', 'Reactive Forms', 'Routing & Guards', 'HTTP Client']
      },
      {
        title: 'HTML5',
        description: 'Semantic markup, accessibility standards (ARIA), forms validation, responsive viewport controls, and modern web standards.',
        topics: ['Semantic Structure', 'HTML5 Forms & Inputs', 'SEO Markup', 'Web Accessibility (a11y)']
      },
      {
        title: 'CSS3',
        description: 'Modern layout systems including Flexbox, CSS Grid, media queries, CSS variables, transitions, keyframe animations, and responsive UI.',
        topics: ['Flexbox & Grid', 'Responsive Breakpoints', 'Keyframe Animations', 'Custom Properties', 'BEM Methodology']
      },
      {
        title: 'Bootstrap',
        description: 'Grid systems, responsive utility classes, pre-built components, theme customization, and rapid interface prototyping.',
        topics: ['12-Column Grid', 'Utility Classes', 'Modal & Navbar Components', 'Responsive Breakpoints']
      },
      {
        title: 'JavaScript',
        description: 'Modern ES6+ syntax, DOM manipulation, promises, async/await, closures, prototypes, event loop, and client-side storage.',
        topics: ['ES6+ Features', 'Async / Fetch API', 'DOM & Event Handling', 'Closures & Scopes', 'Local Storage']
      },
      {
        title: 'TypeScript',
        description: 'Static type checking, interfaces, type aliases, generics, enums, utility types, and strict mode for scalable frontend systems.',
        topics: ['Type Annotations', 'Interfaces & Types', 'Generics', 'Modules & Namespaces', 'Angular Integration']
      }
    ]
  },
  {
    id: 'database',
    name: 'Database Technologies',
    tagline: 'Relational data modeling, schema optimization & performant queries',
    icon: '🗄️',
    courses: [
      {
        title: 'PostgreSQL',
        description: 'Advanced open-source relational database management, schema creation, ACID transactions, stored functions, and indexing.',
        topics: ['Schema Design', 'Foreign Keys & Constraints', 'Indexes & Performance', 'JSONB Storage', 'Transactions']
      },
      {
        title: 'Database Design',
        description: 'Entity-relationship modeling, 1NF to 3NF normalization, data integrity rules, keys, and relational schema architecture.',
        topics: ['ER Diagrams', 'Data Normalization', 'Cardinality & Relations', 'Schema Documentation']
      },
      {
        title: 'SQL & Database Management',
        description: 'Query optimization, JOINs, subqueries, aggregate functions, window functions, and database administration fundamentals.',
        topics: ['Complex JOINs', 'Aggregations & Group By', 'Subqueries & Views', 'Backup & Restoration']
      }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & Deployment',
    tagline: 'Linux server administration, hosting environments & cloud infrastructure',
    icon: '☁️',
    courses: [
      {
        title: 'AWS (Amazon Web Services)',
        description: 'Core cloud concepts: EC2 virtual servers, S3 object storage, security groups, IAM policies, and cloud cost management.',
        topics: ['EC2 Instance Setup', 'S3 Storage', 'Security Groups & IAM', 'Elastic IP & DNS Mapping']
      },
      {
        title: 'VPS Management',
        description: 'Linux Ubuntu server provisioning, SSH key access, terminal operations, package management, firewall configuration (UFW), and swap.',
        topics: ['Ubuntu Linux Basics', 'SSH Key Authentication', 'UFW Firewall', 'Process Monitoring (htop)']
      },
      {
        title: 'Server Deployment & CI/CD',
        description: 'Deploying Angular and Node.js / .NET applications using Nginx reverse proxy, PM2 process management, and SSL via Certbot.',
        topics: ['Nginx Configuration', 'Reverse Proxy Setup', 'Free Let’s Encrypt SSL', 'PM2 Process Daemon']
      },
      {
        title: 'Hosting Management & DNS',
        description: 'Domain registrar management, A/CNAME/MX records, DNS propagation, web hosting control panels, and mail servers.',
        topics: ['DNS Records (A, CNAME)', 'Domain Pointing', 'Nameservers', 'SSL Certificate Management']
      }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile App Development',
    tagline: 'Native performance cross-platform mobile apps for Android & iOS',
    icon: '📱',
    courses: [
      {
        title: 'Flutter Development',
        description: 'Dart programming, widget trees, state management (Provider / Riverpod), responsive mobile layouts, and device APIs.',
        topics: ['Dart Language Core', 'Stateless & Stateful Widgets', 'State Management', 'Navigation & Routing']
      },
      {
        title: 'Cross-Platform Mobile Apps',
        description: 'Single codebase targeting Android and iOS, local SQLite storage, camera and location permissions, and app lifecycle.',
        topics: ['Native Platform Bridges', 'Mobile Storage', 'Push Notifications', 'Asset & Icon Optimization']
      },
      {
        title: 'Mobile State Management & API Sync',
        description: 'Connecting mobile frontends to REST APIs, handling offline mode, token persistence, and app store release preparation.',
        topics: ['REST API Integration', 'Offline Data Caching', 'Secure Token Storage', 'APK Build & Release']
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced Technology',
    tagline: 'Practical machine learning fundamentals & data-driven business intelligence',
    icon: '🧠',
    courses: [
      {
        title: 'AI & Machine Learning Concepts',
        description: 'Supervised vs. unsupervised learning, regression, classification, model evaluation, and integrating AI APIs into software applications.',
        topics: ['ML Workflow & Principles', 'Model Training Basics', 'Overfitting & Regularization', 'AI API Integration']
      },
      {
        title: 'Data Analytics Basics',
        description: 'Exploratory data analysis, cleaning tabular data, computing business metrics, and preparing data for dashboards.',
        topics: ['Data Wrangling', 'Summary Statistics', 'Trend & Pattern Analysis', 'Business KPI Calculations']
      },
      {
        title: 'Python Data Tooling',
        description: 'Practical data manipulation with Pandas, numerical computing with NumPy, and visualization with Matplotlib / Seaborn.',
        topics: ['Pandas DataFrames', 'NumPy Arrays', 'Data Cleaning & Filtering', 'Visualization Charts']
      }
    ]
  }
];

export const TRAINING_DURATION_PLANS: TrainingDurationPlan[] = [
  {
    id: 'plan-3m',
    title: '3 Months Training',
    duration: '3 Months',
    badge: 'Foundations & Core Skills',
    focus: 'Ideal for beginners and students who want to build a rock-solid foundation in a core programming language or frontend framework.',
    deliverables: [
      'Technology fundamentals & syntax mastery.',
      'Core programming concepts & OOP principles.',
      'Practical coding exercises & module assignments.',
      'Basic project development from scratch.',
      'Code reviews and developer mentorship.'
    ],
    features: [
      'Instructor-guided practical sessions',
      'Hands-on coding assignments',
      'Source code access & practice materials',
      'Basic capstone project implementation'
    ]
  },
  {
    id: 'plan-6m',
    title: '6 Months Training',
    duration: '6 Months',
    badge: 'Most Popular for Job Readiness',
    isPopular: true,
    focus: 'Comprehensive program covering both frontend and backend development with structured database integration and API building.',
    deliverables: [
      'Detailed technology learning & deep dives.',
      'Advanced programming concepts & architectural patterns.',
      'Database and REST API development.',
      'Practical project implementation with real datasets.',
      'Industry-oriented development practices & standards.',
      'Git workflows & collaborative coding exercises.'
    ],
    features: [
      'Complete full-stack module access',
      'Database integration with PostgreSQL/SQL',
      'REST API design & security (JWT)',
      'Mid-level production project deployment',
      'Resume guidance & project portfolio review'
    ]
  },
  {
    id: 'plan-12m',
    title: '12 Months Training',
    duration: '12 Months',
    badge: 'Enterprise Full-Stack Mastery',
    focus: 'Comprehensive end-to-end technology master program designed to develop autonomous, full-stack software development capability.',
    deliverables: [
      'Comprehensive multi-technology training.',
      'Advanced full-stack architecture & design principles.',
      'Live project exposure with enterprise workflows.',
      'Real-world application development & maintenance.',
      'Deployment on Linux VPS and cloud server management.',
      'End-to-end project experience with CI/CD concepts.'
    ],
    features: [
      'Advanced enterprise stack (.NET Core, Angular, SQL, Cloud)',
      'Production-grade live project development',
      'Linux VPS deployment, domain & SSL configuration',
      'Complete end-to-end software delivery lifecycle',
      'Extensive project portfolio build-up'
    ]
  }
];

export const PROJECT_WORKFLOW_STEPS: ProjectWorkflowStep[] = [
  {
    step: '01',
    title: 'Architecture & System Design',
    description: 'Deconstruct real business requirements, create entity relationship diagrams, define REST API contracts, and design modular folder structures.',
    icon: '📐',
    skills: ['ER Diagrams', 'API Contracts', 'System Modeling', 'Requirements Breakdown']
  },
  {
    step: '02',
    title: 'Frontend Component Development',
    description: 'Build interactive user interfaces using Angular standalone components, responsive layout systems with CSS Grid/Flexbox, and accessible web standards.',
    icon: '💻',
    skills: ['Angular Components', 'Reactive Forms', 'Responsive UI', 'State Management']
  },
  {
    step: '03',
    title: 'REST API & Business Logic',
    description: 'Develop secure, performant backend controllers, service layers, dependency injection, and data validation using ASP.NET Core or Node.js.',
    icon: '⚡',
    skills: ['RESTful Standards', 'Middleware', 'Validation', 'C# / TypeScript']
  },
  {
    step: '04',
    title: 'Database Connectivity & ORM',
    description: 'Connect backend applications to PostgreSQL or relational databases using Entity Framework Core or native drivers, writing optimized queries and transactions.',
    icon: '🗄️',
    skills: ['PostgreSQL', 'EF Core', 'Foreign Keys', 'Query Optimization']
  },
  {
    step: '05',
    title: 'Authentication & Security',
    description: 'Implement secure user registration, password hashing (Bcrypt/Argon2), JWT token generation, role-based authorization, and protected route guards.',
    icon: '🔒',
    skills: ['JWT Tokens', 'Role-Based Access', 'Route Guards', 'Password Hashing']
  },
  {
    step: '06',
    title: 'Git Version Control & PR Workflow',
    description: 'Learn real industry team collaboration: Git branching, meaningful commits, resolving merge conflicts, and participating in code review workflows.',
    icon: '🌿',
    skills: ['Git Branching', 'Pull Requests', 'Merge Resolution', 'Code Reviews']
  },
  {
    step: '07',
    title: 'Cloud & Linux VPS Deployment',
    description: 'Provision live Ubuntu VPS instances, configure Nginx reverse proxies, secure environments with Let’s Encrypt SSL, and monitor background processes.',
    icon: '🚀',
    skills: ['Ubuntu Linux', 'Nginx Config', 'SSL Setup', 'Process Daemons']
  },
  {
    step: '08',
    title: 'Debugging, Profiling & Troubleshooting',
    description: 'Identify memory leaks, profile slow SQL queries, inspect browser network traffic, diagnose backend stack traces, and write maintainable solutions.',
    icon: '🛠️',
    skills: ['Chrome DevTools', 'Log Inspection', 'Query Profiling', 'Bug Resolution']
  }
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    title: 'Practical Learning Approach',
    description: 'Every session focuses on real implementation rather than dry lecture theory. You write code from day one.',
    icon: '🎯'
  },
  {
    title: 'Live Project Exposure',
    description: 'Work on actual software features, modules, and workflows modeled after real-world production software.',
    icon: '💼'
  },
  {
    title: 'Industry-Relevant Technologies',
    description: 'Curriculum focused strictly on technologies currently in demand across the modern IT industry (.NET, Angular, Cloud, PostgreSQL).',
    icon: '🚀'
  },
  {
    title: 'Experienced Technical Guidance',
    description: 'Learn directly alongside working software developers who build and maintain production systems every day.',
    icon: '👨‍💻'
  },
  {
    title: 'Full-Stack Development Learning',
    description: 'Understand how databases, backend APIs, and frontend interfaces connect together seamlessly into complete applications.',
    icon: '🔄'
  },
  {
    title: 'Real-World Problem Solving',
    description: 'Tackle genuine technical challenges like concurrency, validation, schema migrations, and secure authentication.',
    icon: '🧩'
  },
  {
    title: 'Modern Development Tools',
    description: 'Master industry standards including Git version control, Postman API testing, VS Code, Visual Studio, and Linux terminals.',
    icon: '⚙️'
  },
  {
    title: 'Project-Based Training',
    description: 'Graduate with tangible, working projects in your portfolio to showcase your hands-on coding abilities.',
    icon: '🏆'
  }
];

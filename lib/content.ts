export const profile = {
  name: 'Ichiro Okochi',
  tagline: 'CompE @ Purdue | Student Leader | Looking for Summer 2026 Internships',
  major: 'Computer Engineering (Purdue University)',
  interests: ['AI', 'Engineering', 'Web Dev', 'UX Design', 'Leadership']
};

export const experiences = [
  {
    role: 'Design Lead',
    org: 'EPICS x KL University',
    period: '2025 - Present',
    detail:
      'Leading UX and product design for VaaniConnect, an AI Indian-language translation platform developed in collaboration with KL University in India.'
  },
  {
    role: 'Rocket Engineering Member',
    org: 'Purdue Space Program',
    period: '2024 - Present',
    detail:
      'Contributed to the 300 mm onboarding rocket through NX CAD design, OpenRocket simulations, Excel-based flight modeling, and 3D-printed component workflows.'
  },
  {
    role: 'Freelance Web Developer',
    org: 'Student & Client Projects',
    period: '2023 - Present',
    detail:
      'Built modern websites for organizations and personal clients with focus on responsive UX, speed, and polished branding.'
  }
];

export type Project = {
  title: string;
  category: string;
  summary: string;
  stack: string[];
  impact: string;
  image: string;
  href?: string;
};

export const projects: Project[] = [
  {
    title: 'VaaniConnect',
    category: 'AI + Language Accessibility',
    summary:
      'AI-powered Indian-language translation app designed to improve communication and inclusion across linguistic communities.',
    stack: ['Next.js', 'TypeScript', 'AI APIs', 'Figma'],
    impact: 'Design Lead working directly with KL University team in India.',
    image: '/gallery/brand-1.svg',
    href: '/projects'
  },
  {
    title: 'Purdue 300 mm Onboarding Rocket',
    category: 'Aerospace Engineering',
    summary:
      'End-to-end rocket subsystem contributions with NX CAD, OpenRocket simulation, Excel flight model analysis, and 3D-printed parts.',
    stack: ['Siemens NX', 'OpenRocket', 'Excel', '3D Printing'],
    impact: 'Improved design reliability and test-readiness for onboarding workflows.',
    image: '/gallery/rocket-1.svg',
    href: '/gallery'
  },
  {
    title: 'Organization & Client Websites',
    category: 'Web Development',
    summary:
      'Multiple custom websites for organizations and clients with clean UI systems, SEO-minded architecture, and conversion-focused layouts.',
    stack: ['Next.js', 'Tailwind', 'Framer Motion', 'Vercel'],
    impact: 'Strengthened brand credibility and digital presence for stakeholders.',
    image: '/gallery/project-1.svg',
    href: '/projects'
  },
  {
    title: 'AI / Gesture / Automation Lab',
    category: 'R&D Side Projects',
    summary:
      'Exploratory systems combining computer vision, gesture control, and automation for practical everyday interactions.',
    stack: ['Python', 'OpenCV', 'TensorFlow', 'Node.js'],
    impact: 'Rapid prototyping discipline and experimentation mindset.',
    image: '/gallery/rocket-2.svg',
    href: '/projects'
  }
];

export type SkillCategory = 'Programming' | 'Hardware' | 'Tools' | 'Leadership';

export type SkillItem = {
  name: string;
  category: SkillCategory;
  level: number;
};

export const skills: SkillItem[] = [
  { name: 'TypeScript', category: 'Programming', level: 92 },
  { name: 'React / Next.js', category: 'Programming', level: 90 },
  { name: 'Python', category: 'Programming', level: 84 },
  { name: 'Computer Vision', category: 'Programming', level: 78 },
  { name: 'Siemens NX CAD', category: 'Hardware', level: 80 },
  { name: 'OpenRocket', category: 'Hardware', level: 76 },
  { name: '3D Printing Workflow', category: 'Hardware', level: 82 },
  { name: 'Embedded Prototyping', category: 'Hardware', level: 72 },
  { name: 'Tailwind CSS', category: 'Tools', level: 88 },
  { name: 'Framer Motion', category: 'Tools', level: 84 },
  { name: 'Figma', category: 'Tools', level: 86 },
  { name: 'Vercel + GitHub', category: 'Tools', level: 83 },
  { name: 'Design Leadership', category: 'Leadership', level: 88 },
  { name: 'Cross-Cultural Collaboration', category: 'Leadership', level: 90 },
  { name: 'Mentorship', category: 'Leadership', level: 82 },
  { name: 'Project Planning', category: 'Leadership', level: 85 }
];

export const socialLinks = {
  github: 'https://github.com/ichiro-okochi',
  linkedin: 'https://www.linkedin.com/in/ichiro-okochi',
  email: 'mailto:ichiro@example.com',
  instagram: 'https://instagram.com/ichiro'
};

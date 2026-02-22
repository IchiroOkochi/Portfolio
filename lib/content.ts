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

export const projects = [
  {
    title: 'VaaniConnect',
    category: 'AI + Language Accessibility',
    summary:
      'AI-powered Indian-language translation app designed to improve communication and inclusion across linguistic communities.',
    stack: ['Next.js', 'TypeScript', 'AI APIs', 'Figma'],
    impact: 'Design Lead working directly with KL University team in India.'
  },
  {
    title: 'Purdue 300 mm Onboarding Rocket',
    category: 'Aerospace Engineering',
    summary:
      'End-to-end rocket subsystem contributions with NX CAD, OpenRocket simulation, Excel flight model analysis, and 3D-printed parts.',
    stack: ['Siemens NX', 'OpenRocket', 'Excel', '3D Printing'],
    impact: 'Improved design reliability and test-readiness for onboarding workflows.'
  },
  {
    title: 'Organization & Client Websites',
    category: 'Web Development',
    summary:
      'Multiple custom websites for organizations and clients with clean UI systems, SEO-minded architecture, and conversion-focused layouts.',
    stack: ['Next.js', 'Tailwind', 'Framer Motion', 'Vercel'],
    impact: 'Strengthened brand credibility and digital presence for stakeholders.'
  },
  {
    title: 'AI / Gesture / Automation Lab',
    category: 'R&D Side Projects',
    summary:
      'Exploratory systems combining computer vision, gesture control, and automation for practical everyday interactions.',
    stack: ['Python', 'OpenCV', 'TensorFlow', 'Node.js'],
    impact: 'Rapid prototyping discipline and experimentation mindset.'
  }
];

export const skills = {
  engineering: ['Computer Engineering', 'Systems Thinking', 'Rapid Prototyping', 'Simulation'],
  software: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
  ai: ['Prompt Engineering', 'Applied AI Integrations', 'Computer Vision', 'Automation'],
  leadership: ['Design Leadership', 'Cross-Cultural Collaboration', 'Mentorship', 'Project Planning']
};

export const socialLinks = {
  github: 'https://github.com/ichiro-okochi',
  linkedin: 'https://www.linkedin.com/in/ichiro-okochi',
  email: 'mailto:ichiro@example.com',
  instagram: 'https://instagram.com/ichiro'
};

export const blogPosts = [
  {
    slug: 'designing-vaaniconnect',
    title: 'Designing VaaniConnect for Real-World Language Access',
    excerpt:
      'How we approach accessibility, UX systems, and multilingual user journeys while collaborating across borders.',
    date: '2026-01-10'
  },
  {
    slug: 'rocket-modeling-workflow',
    title: 'From NX CAD to Flight Model: Rocket Workflow Notes',
    excerpt:
      'A concise look at how CAD, simulation, and spreadsheet modeling align during onboarding rocket development.',
    date: '2025-11-21'
  },
  {
    slug: 'portfolio-as-product',
    title: 'Treating Your Portfolio Like a Product',
    excerpt:
      'Why interaction design, performance, and narrative matter when recruiting teams evaluate your work.',
    date: '2025-09-03'
  }
];

export const galleryImages = [
  { src: '/gallery/rocket-1.svg', alt: 'Rocket concept render', caption: '300 mm rocket concept exploration' },
  { src: '/gallery/rocket-2.svg', alt: 'Simulation chart', caption: 'OpenRocket simulation snapshot aesthetic' },
  { src: '/gallery/project-1.svg', alt: 'VaaniConnect interface', caption: 'VaaniConnect product direction' },
  { src: '/gallery/brand-1.svg', alt: 'Personal brand board', caption: 'Personal brand visual board' }
];

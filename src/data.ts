// ─── SITE CONTENT ────────────────────────────────────────────────────────────
// Edit this file to update all content across the portfolio.

export const site = {
  name: 'labspace',
  email: 'hello@labspace.dev',
  location: 'Indonesia',
  year: '2025',
};

export const hero = {
  title: 'labspace',
  tagline: 'Personal playground where design meets code — crafting digital experiences through curiosity, experimentation, and obsessive attention to detail.',
  meta: [
    { label: 'Based in', value: 'Indonesia' },
    { label: 'Focus', value: 'Frontend' },
    { label: 'Available', value: 'Freelance' },
  ],
};

export const about = {
  label: 'About',
  lines: [
    'I build things for the web — blending',
    'design sensibility with engineering rigor',
    'to create experiences that feel',
    'crafted, smooth, and intentional.',
  ],
};

export const projects = [
  {
    index: '01',
    title: 'Project Alpha',
    tags: ['Platform', '2024'],
    description: 'A unified digital platform designed for scalability and seamless user experience across devices.',
    infoBg: 'bg-white',
    mediaBg: 'bg-[#e8e8e4]',
    image: 'https://images.unsplash.com/photo-1592982537447-6f29e18b6fc4?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'Project Alpha',
    href: '#',
  },
  {
    index: '02',
    title: 'Project Beta',
    tags: ['Web App', '2023'],
    description: 'A high-performance web application with focus on interactive motion and fluid transitions.',
    infoBg: 'bg-[#E8E7E3]',
    mediaBg: 'bg-[#d5d5d0]',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'Project Beta',
    href: '#',
  },
  {
    index: '03',
    title: 'Project Gamma',
    tags: ['Experimental', '2023'],
    description: 'Pushing the boundaries of web experiences with creative coding and interactive technologies.',
    infoBg: 'bg-[#D5D8DF]',
    mediaBg: 'bg-[#c5c8cf]',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'Project Gamma',
    href: '#',
  },
  {
    index: '04',
    title: 'Project Delta',
    tags: ['Design System', '2024'],
    description: 'A comprehensive design system built for consistency, accessibility, and developer experience.',
    infoBg: 'bg-white',
    mediaBg: 'bg-[#eeeeee]',
    image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'Project Delta',
    href: '#',
  },
];

export const expertiseHeading = {
  label: 'What I do',
  lines: ['Design, code,', 'and motion — crafted', 'with obsession.'],
};

export const services = [
  {
    title: 'Design',
    index: '(01)',
    items: ['UI / UX Design', 'Design Systems', 'Prototyping', 'Art Direction'],
  },
  {
    title: 'Code',
    index: '(02)',
    items: ['React / Next.js', 'TypeScript', 'Animation & Motion', 'Performance'],
  },
  {
    title: 'Create',
    index: '(03)',
    items: ['WebGL / Three.js', 'Micro-interactions', 'Scroll Experiences', 'Creative Coding'],
  },
  {
    title: 'Ship',
    index: '(04)',
    items: ['CI / CD', 'Testing', 'Deployment', 'Monitoring'],
  },
];

export const story = {
  label: 'My Story',
  titleLines: ['Experimenting &', 'building since', 'em:day one.'],
  body: 'I treat every project as a lab experiment — a chance to explore new techniques, push boundaries, and refine my craft. The web is my playground, and every pixel is an opportunity to learn something new.',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
  imageAlt: 'Workspace',
};

export const cta = {
  line1: ["Let's build", 'something'],
  scrambleWords: ['cool', 'bold', 'fresh', 'wild', 'great'],
  ctaLabel: 'Say hello',
  ctaHref: 'mailto:hello@labspace.dev',
};

export const footer = {
  nav: [
    { label: 'Work', href: '#projects' },
    { label: 'Skills', href: '#services' },
    { label: 'About', href: '#story' },
    { label: 'Contact', href: '#cta' },
  ],
  services: ['Design', 'Frontend', 'Motion', 'Creative Dev'],
  social: [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Dribbble', href: '#' },
  ],
};

// ─── SITE CONTENT ────────────────────────────────────────────────────────────
// Edit this file to update all content across the portfolio.
import cuplikanImg from './assets/images/projects/cuplikan.png';

export const site = {
  name: 'labspace',
  email: 'resbayuaji@gmail.com',
  location: 'Indonesia',
  year: '2025',
};

export const hero = {
  title: 'labspace',
  tagline: 'Frontend engineer crafting web experiences — from patient-facing apps to internal tools, shipping reliable solutions across platforms.',
  meta: [
    { label: 'Based in', value: 'Indonesia' },
    { label: 'Focus', value: 'Frontend' },
  ],
};

export const about = {
  label: 'About',
  lines: [
    'I build things for the web — from',
    'patient-facing apps to internal tools,',
    'delivering reliable and maintainable',
    'solutions across platforms.',
  ],
};

export const projects = [
  {
    index: '01',
    title: 'Cuplikan',
    tags: ['React.js', 'Tailwind', 'TMDB API'],
    description: 'A web application built with React.js and Tailwind CSS, utilizing the public API from api.themoviedb.org to display movie and TV show data.',
    infoBg: 'bg-white',
    mediaBg: 'bg-[#e8e8e4]',
    image: cuplikanImg,
    imageAlt: 'Cuplikan',
    href: 'https://cuplikan-netflix.vercel.app/',
  },
  {
    index: '02',
    title: 'AlteaCare Lite',
    tags: ['Healthcare', '2022 - 2023'],
    description: 'Teleconsultation, doctor appointment, and booking lab web app built with Next.js, Tailwind, TypeScript, Redux Toolkit, and PWA.',
    infoBg: 'bg-[#E8E7E3]',
    mediaBg: 'bg-[#d5d5d0]',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'AlteaCare Lite',
    href: '#',
  },
  {
    index: '03',
    title: 'Wadhbank',
    tags: ['Digital Banking', '2022'],
    description: 'A shariah digital banking platform consisting of landing page and dashboard, built with Next.js and TypeScript.',
    infoBg: 'bg-[#D5D8DF]',
    mediaBg: 'bg-[#c5c8cf]',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'Wadhbank',
    href: '#',
  },
  {
    index: '04',
    title: 'Alphaveritas',
    tags: ['Ad Tech', '2021'],
    description: 'A multiple advertisement management dashboard integrating Facebook Ads API and Twitter Ads API, built with React.js.',
    infoBg: 'bg-white',
    mediaBg: 'bg-[#eeeeee]',
    image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'Alphaveritas',
    href: '#',
  },
];

export const expertiseHeading = {
  label: 'What I do',
  lines: ['Build, migrate,', 'and ship — across', 'platforms.'],
};

export const services = [
  {
    title: 'Core',
    index: '(01)',
    items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Nuxt.js', 'React Native'],
  },
  {
    title: 'State & API',
    index: '(02)',
    items: ['Redux', 'Context API', 'REST API', 'GraphQL'],
  },
  {
    title: 'Styling',
    index: '(03)',
    items: ['Tailwind', 'Styled Components', 'SCSS/SASS', 'MaterialUI', 'Ant Design'],
  },
  {
    title: 'Tools',
    index: '(04)',
    items: ['Git', 'Turborepo', 'Electron.js', 'PWA'],
  },
];

export const story = {
  label: 'My Story',
  titleLines: ['Building &', 'shipping since', 'em:2019.'],
  body: 'Started as an intern, grew into handling app migrations, legacy rewrites, and cross-platform development. I focus on delivering reliable solutions — whether it\'s a patient-facing web app, a desktop kiosk, or an internal tool used across hospital branches.',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
  imageAlt: 'Workspace',
};

export const cta = {
  line1: ["Let's build", 'something'],
  scrambleWords: ['cool', 'bold', 'fresh', 'wild', 'great'],
  ctaLabel: 'Say hello',
  ctaHref: 'mailto:resbayuaji@gmail.com',
};

export const footer = {
  personal: {
    name: 'Restu Bayu Aji',
    location: 'Indonesia',
    email: 'resbayuaji@gmail.com',
  },
  social: [
    { label: 'GitHub', href: 'https://github.com/restuba' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/restuba' },
    { label: 'Behance', href: 'https://behance.net/rbayua' },
  ],
};

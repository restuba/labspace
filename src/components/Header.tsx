import { site } from '../data';
import Logo from './Logo';
import { getLenis } from '../hooks/useScrollReady';

const nav = [
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#services' },
  { label: 'About', href: '#story' },
  { label: 'Contact', href: '#cta' },
];

function scrollTo(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (!href) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(href, { duration: 4.4, immediate: true });
  else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Header() {
  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full h-[72px] px-6 md:px-10 flex items-center justify-between z-[100]"
      style={{ transform: 'translateY(-102%)' }}
    >
      <div className="header-bg absolute inset-0 bg-bg/80 backdrop-blur-xl border-b border-black/5 transition-colors duration-700" />

      <a
        href="#hero"
        onClick={scrollTo}
        className="relative z-10 flex items-center gap-2 header-text text-primary transition-colors duration-700"
      >
        <Logo size={28} />
        <span className="font-serif text-xl font-semibold tracking-tight">{site.name}</span>
      </a>

      <nav className="relative z-10 hidden md:flex gap-8 text-[13px] uppercase tracking-widest font-medium">
        {nav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={scrollTo}
            className="header-text text-primary transition-colors duration-700 hover:opacity-60"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="relative z-10 flex items-center gap-4">
        {/* <span className="header-text text-primary text-[13px] uppercase tracking-widest font-medium hidden md:inline transition-colors duration-700">
          EN
        </span> */}
      </div>
    </header>
  );
}

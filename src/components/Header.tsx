import { site, footer } from '../data';

// All scroll/animation logic is handled centrally in App.tsx
export default function Header() {
  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full h-[72px] px-6 md:px-10 flex items-center justify-between z-[100]"
      style={{ transform: 'translateY(-102%)' }}
    >
      {/* Background layer — toggled via .header-dark class from App.tsx */}
      <div className="header-bg absolute inset-0 bg-bg/80 backdrop-blur-xl border-b border-black/5 transition-colors duration-700" />

      <a
        href="#hero"
        className="relative z-10 font-serif text-2xl font-semibold tracking-tight header-text text-primary transition-colors duration-700"
      >
        {site.name}
      </a>

      <nav className="relative z-10 hidden md:flex gap-8 text-[13px] uppercase tracking-widest font-medium">
        {footer.nav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="header-text text-primary transition-colors duration-700 hover:opacity-60"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="relative z-10 flex items-center gap-4">
        <span className="header-text text-primary text-[13px] uppercase tracking-widest font-medium hidden md:inline transition-colors duration-700">
          EN
        </span>
      </div>
    </header>
  );
}

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { site, footer } from '../data';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const footerElement = footerRef.current;
    if (!footerElement) return;

    const children = footerElement.querySelectorAll<HTMLElement>('[data-section-reveal-item]');
    if (!children.length) return;

    gsap.from(children, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: footerElement,
        start: 'top 80%',
        once: true,
      },
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-primary text-bg/70 px-6 md:px-10 py-16 md:py-20" data-section-reveal>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-16" data-section-reveal-item>
          <div>
            <p className="text-sm text-bg">{footer.personal.name}</p>
            <p className="text-sm mt-1">{footer.personal.location}</p>
            <a href={`mailto:${footer.personal.email}`} className="text-sm footer-link mt-1 inline-block">
              {footer.personal.email}
            </a>
          </div>
          <div>
            <ul className="flex gap-6 text-sm">
              {footer.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="footer-link" data-magnetic="0.2">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-section-reveal-item>
          <span className="font-serif text-3xl font-semibold text-bg tracking-tight">{site.name}</span>
          <span className="text-xs opacity-30">
            &copy;
            {' '}
            {site.year}
            {' '}
            {footer.personal.name}
          </span>
        </div>
      </div>
    </footer>
  );
}

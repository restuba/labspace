import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { projects } from '../data';

export default function Projects() {
  const wrapperRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cards = gsap.utils.toArray<HTMLElement>('.project-card');
    const total = cards.length;
    let lastIdx = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
        onUpdate: (self) => {
          const p = self.progress;
          const idx = Math.min(total - 1, Math.floor(p * total * 0.99));
          if (counterRef.current && lastIdx !== idx) {
            counterRef.current.textContent = String(idx + 1).padStart(2, '0');
            gsap.fromTo(
              counterRef.current,
              { y: idx > lastIdx ? 12 : -12, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', overwrite: true,
              },
            );
            lastIdx = idx;
          }
          if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;
        },
      },
    });

    cards.forEach((card, i) => {
      if (i === total - 1) return;
      const img = card.querySelector<HTMLElement>('.project-img');
      const desc = card.querySelector<HTMLElement>('.project-desc');
      const ctaEl = card.querySelector<HTMLElement>('.project-cta');
      const tags = card.querySelectorAll<HTMLElement>('.project-tag');
      const title = card.querySelector<HTMLElement>('.project-title');
      const label = `r${i}`;

      if (desc) {
        tl.to(desc, {
          opacity: 0, y: -15, duration: 0.3, ease: 'power2.in',
        }, label);
      }
      if (ctaEl) tl.to(ctaEl, { opacity: 0, duration: 0.25, ease: 'power2.in' }, label);
      if (tags.length) {
        tl.to(tags, {
          opacity: 0, scale: 0.9, stagger: 0.02, duration: 0.2, ease: 'power2.in',
        }, label);
      }
      if (img) tl.to(img, { scale: 1.15, duration: 0.9, ease: 'power2.in' }, `${label}+=0.1`);
      if (title) {
        tl.to(title, {
          y: -30, opacity: 0, duration: 0.45, ease: 'power3.in',
        }, `${label}+=0.2`);
      }
      tl.to(card, {
        clipPath: 'inset(0 0 100% 0 round 16px)', duration: 0.8, ease: 'power3.inOut',
      }, `${label}+=0.15`);
      tl.to({}, { duration: 0.12 });
    });

    // Image mouse tracking with quickTo
    const cleanups: (() => void)[] = [];
    cards.forEach((card) => {
      const media = card.querySelector<HTMLElement>('.project-media');
      const img = card.querySelector<HTMLElement>('.project-img');
      if (!media || !img) return;

      const xTo = gsap.quickTo(img, 'x', { duration: 0.7, ease: 'power2.out' });
      const yTo = gsap.quickTo(img, 'y', { duration: 0.7, ease: 'power2.out' });

      const onMove = (event: MouseEvent) => {
        const rect = media.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        xTo(x * 12);
        yTo(y * 8);
      };
      const onLeave = () => {
        gsap.to(img, {
          x: 0, y: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto',
        });
      };

      media.addEventListener('mousemove', onMove);
      media.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        media.removeEventListener('mousemove', onMove);
        media.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, { scope: wrapperRef });

  return (
    <section id="projects" ref={wrapperRef} className="project-wrapper relative">
      <div className="project-sticky sticky top-0 h-screen w-full flex flex-col px-6 md:px-10 pt-24 pb-6">
        {/* Header row */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="section-line w-0 h-px bg-primary/30" />
            <h2 className="text-xs uppercase tracking-[0.3em] font-medium">Selected Work</h2>
          </div>
          <div className="project-counter flex items-baseline gap-1.5">
            <span ref={counterRef} className="counter-current text-3xl md:text-4xl font-serif font-semibold leading-none tabular-nums">01</span>
            <span className="text-sm opacity-20 font-light">/</span>
            <span className="text-sm opacity-20 font-light">{String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-black/5 mb-4 rounded-full overflow-hidden">
          <div ref={progressRef} className="project-progress h-full bg-accent rounded-full" style={{ width: '0%' }} />
        </div>

        {/* Card stack */}
        <div className="project-stack relative flex-1 w-full overflow-hidden rounded-2xl border border-black/[0.04]">
          {projects.map((p, i) => (
            <div
              key={p.index}
              className="project-card absolute inset-0 flex flex-col md:flex-row rounded-2xl overflow-hidden cursor-pointer group"
              style={{ zIndex: (projects.length - i) * 10 }}
            >
              {/* Info */}
              <div className={`project-info w-full md:w-[40%] p-6 md:p-10 flex flex-col justify-between ${p.infoBg} relative z-10`}>
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[11px] font-mono font-medium opacity-25">{p.index}</span>
                    <div className="flex gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="project-tag text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/[0.03] font-medium opacity-50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="project-title text-4xl md:text-6xl font-serif font-semibold tracking-tight leading-none mb-6">
                    {p.title}
                  </h3>
                  <div className="project-desc">
                    <p className="text-sm md:text-base opacity-50 leading-relaxed max-w-sm">{p.description}</p>
                  </div>
                </div>
                <div className="project-cta flex items-center gap-3">
                  <span className="text-xs uppercase tracking-[0.2em] font-medium opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
                    View project
                  </span>
                  <span className="text-sm opacity-40 group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
              </div>

              {/* Media */}
              <div className={`project-media w-full md:w-[60%] h-[240px] md:h-auto overflow-hidden relative ${p.mediaBg}`}>
                <img
                  src={p.image}
                  className="project-img w-full h-full object-cover"
                  alt={p.imageAlt}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

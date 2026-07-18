import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { services } from '../data';

export default function Services() {
  const wrapperRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.service-panel:not(.service-panel-last)');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      panels.forEach((panel, i) => {
        const desc = panel.querySelector<HTMLElement>('.service-desc');
        const line = panel.querySelector<HTMLElement>('.service-line');
        const label = `s${i}`;
        tl.to(panel, { width: 90, duration: 1, ease: 'power2.inOut' }, label);
        if (desc) tl.to(desc, { opacity: 0, duration: 0.5, ease: 'power2.in' }, label);
        if (line) tl.to(line, { width: 0, duration: 0.6 }, label);
        tl.to({}, { duration: 0.08 });
      });
    });

    return () => mm.revert();
  }, { scope: wrapperRef });

  return (
    <section id="services" ref={wrapperRef} className="services-wrapper relative bg-primary">
      <div className="services-sticky sticky top-0 h-screen w-full flex flex-col justify-center p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="section-line-svc w-0 h-px bg-white/20" />
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-bg/50">Services</span>
        </div>

        <div className="services-list flex flex-col md:flex-row w-full flex-1 max-h-[70vh] gap-3">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="service-panel bg-bg rounded-xl md:rounded-2xl p-5 md:p-7 flex flex-col justify-between overflow-hidden relative cursor-pointer group"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold whitespace-nowrap group-hover:text-accent transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <span className="text-[11px] font-medium opacity-30 mt-1">{svc.index}</span>
                </div>
                <div className="service-line w-full h-px bg-black/8 mb-4" />
              </div>
              <div className="service-desc">
                <ul className="text-[13px] opacity-60 leading-relaxed space-y-1.5">
                  {svc.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          ))}

          {/* All Services panel */}
          <div className="service-panel service-panel-last bg-muted/10 rounded-xl md:rounded-2xl p-5 md:p-7 flex flex-col justify-between overflow-hidden relative">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl md:text-2xl font-serif font-semibold whitespace-nowrap text-accent">All Services</h3>
                <span className="text-accent mt-1">→</span>
              </div>
              <div className="w-full h-px bg-accent/15 mb-4" />
            </div>
            <div className="service-desc">
              <p className="text-[13px] opacity-60 text-bg leading-relaxed mb-6">Full range of capabilities.</p>
              <button
                type="button"
                className="px-6 py-3 bg-accent text-white rounded-full text-[13px] font-medium hover:bg-accent/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                Explore All →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

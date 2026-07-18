import { cta } from '../data';

// Scramble + glow animation handled centrally in App.tsx → initCTA()
export default function CTA() {
  return (
    <section id="cta" className="py-32 md:py-48 px-6 md:px-10 bg-bg relative overflow-hidden">
      {/* Radial glow — opacity driven by GSAP scroll */}
      <div
        className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full opacity-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(248,231,49,0.06), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative z-10">
        <div className="md:w-[55%]">
          <h2 className="text-5xl md:text-[9vw] font-serif font-semibold leading-[0.95] tracking-tight">
            {cta.line1.map((line, i) => (
              <span key={i} className="reveal-line" data-reveal>{line}</span>
            ))}
          </h2>
        </div>

        <div className="md:w-[45%] md:flex md:flex-col md:justify-end md:-mt-[8vw]">
          <h2 className="text-5xl md:text-[9vw] font-serif font-semibold leading-[0.95] tracking-tight">
            <span className="reveal-line" data-reveal>
              {/* scramble-target text is mutated by initCTA() */}
              <em className="scramble-target text-accent">{cta.scrambleWords[0]}</em>
            </span>
          </h2>
          <div className="mt-12 reveal-line" data-reveal>
            <a href={cta.ctaHref} className="cta-btn group" data-magnetic="0.25">
              <span className="relative overflow-hidden inline-block h-[1.2em]">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">{cta.ctaLabel}</span>
                <span className="block absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full text-accent">{cta.ctaLabel}</span>
              </span>
              <span className="inline-block transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:-rotate-45">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

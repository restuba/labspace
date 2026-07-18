import { expertiseHeading } from '../data';

// Reveal animation is handled centrally in App.tsx via initRevealLines()
export default function ExpertiseHeading() {
  return (
    <section
      id="expertise-heading"
      className="dark-section py-32 md:py-48 px-6 md:px-10 bg-primary text-bg relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(248,231,49,0.08), transparent 60%)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <span
          className="reveal-line inline-block text-xs uppercase tracking-[0.3em] font-medium opacity-40 mb-12"
          data-reveal
        >
          {expertiseHeading.label}
        </span>
        <h2 className="text-4xl md:text-[5vw] font-serif font-semibold leading-[1.1] tracking-tight">
          {expertiseHeading.lines.map((line, i) => (
            <span key={i} className="reveal-line" data-reveal>{line}</span>
          ))}
        </h2>
      </div>
    </section>
  );
}

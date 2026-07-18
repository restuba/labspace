import { about } from '../data';

// Reveal animation is handled centrally in App.tsx via initRevealLines()
export default function AboutIntro() {
  return (
    <section id="about-intro" className="py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <span
          className="reveal-line inline-block text-xs uppercase tracking-[0.3em] font-medium opacity-40 mb-12"
          data-reveal
        >
          {about.label}
        </span>
        <p className="text-3xl md:text-[3.2vw] leading-[1.3] font-light">
          {about.lines.map((line, i) => (
            <span key={i} className="reveal-line" data-reveal>{line}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

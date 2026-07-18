/* eslint-disable no-plusplus */
import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cta } from '../data';

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    const target = targetRef.current;
    if (!section) return;

    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        },
      });
    }

    if (!target || !cta.scrambleWords.length) return;

    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    let wordIdx = 0;
    let frameId = 0;
    let timeoutId = 0;
    let cancelled = false;

    const scramble = () => {
      if (cancelled) return;
      const word = cta.scrambleWords[wordIdx];
      const current = target.textContent ?? '';
      const maxLen = Math.max(current.length, word.length);
      let frame = 0;
      const totalFrames = 22;

      const step = () => {
        if (cancelled) return;
        let result = '';
        for (let i = 0; i < maxLen; i++) {
          const start = Math.floor(Math.random() * 5);
          const end = start + Math.floor(Math.random() * 8) + 3;
          if (frame >= end || i >= word.length) result += i < word.length ? word[i] : '';
          else if (frame >= start) result += chars[Math.floor(Math.random() * chars.length)];
          else result += i < current.length ? current[i] : '';
        }
        target.textContent = result;
        frame++;
        if (frame <= totalFrames) frameId = requestAnimationFrame(step);
        else {
          target.textContent = word;
          wordIdx = (wordIdx + 1) % cta.scrambleWords.length;
          timeoutId = window.setTimeout(scramble, 2800);
        }
      };

      step();
    };

    ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        timeoutId = window.setTimeout(scramble, 600);
      },
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, { scope: sectionRef });

  return (
    <section id="cta" ref={sectionRef} className="py-32 md:py-48 px-6 md:px-10 bg-bg relative overflow-hidden">
      {/* Radial glow — opacity driven by GSAP scroll */}
      <div
        ref={glowRef}
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
              <em ref={targetRef} className="scramble-target text-accent">{cta.scrambleWords[0]}</em>
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

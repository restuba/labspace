import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { site } from '../data';

interface Props {
  onReveal: () => void;
  onComplete: () => void;
}

export default function Preloader({ onReveal, onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    const letters = root?.querySelectorAll<HTMLElement>('.preloader-letter');
    if (!root || !letters || !bar) return;

    let fade: ReturnType<typeof gsap.to> | undefined;
    const tl = gsap.timeline({
      onComplete: () => {
        root.style.pointerEvents = 'none';
        onReveal();
        fade = gsap.to(root, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    tl.to(letters, {
      y: '0%', duration: 0.9, stagger: 0.06, ease: 'power4.out',
    });
    tl.to(bar, { width: '100%', duration: 1.4, ease: 'power2.inOut' }, '-=0.4');
    tl.to({}, { duration: 0.3 });

    return () => {
      tl.kill();
      fade?.kill();
    };
  }, [onComplete, onReveal]);

  return (
    <div
      id="preloader"
      ref={rootRef}
      className="fixed inset-0 z-[200] bg-primary flex items-center justify-center"
    >
      <div className="text-center">
        <h2 className="text-bg text-5xl md:text-7xl font-serif font-semibold tracking-tight overflow-hidden">
          {site.name.split('').map((char, i) => (
            <span
              key={i}
              className="preloader-letter inline-block"
              style={{ transform: 'translateY(110%)' }}
            >
              {char}
            </span>
          ))}
        </h2>
        <div className="mt-8 mx-auto w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div ref={barRef} className="h-full bg-white rounded-full" style={{ width: '0%' }} />
        </div>
      </div>
    </div>
  );
}

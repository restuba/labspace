/* eslint-disable no-plusplus */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { hero } from '../data';
import Logo from './Logo';

interface Props {
  ready: boolean;
}

export default function Hero({ ready }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  console.log('HERE');

  useGSAP(() => {
    const section = sectionRef.current;
    if (!ready || !section) return;

    const tl = gsap.timeline({ delay: 0.15 });
    tl.from('.hero-title', {
      y: 80, opacity: 0, duration: 1.4, ease: 'power4.out',
    });
    tl.to('.hero-line-v', { height: '100%', duration: 1.3, ease: 'power4.inOut' }, '-=0.9');
    tl.to('.hero-line-h', { width: '100%', duration: 1.3, ease: 'power4.inOut' }, '-=1');
    tl.to('.hero-tagline', {
      opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
    }, '-=0.7');
    tl.to('.hero-meta', {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
    }, '-=0.6');
    tl.to('.scroll-cue', { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4');
    tl.call(() => {
      section.querySelectorAll<HTMLElement>('.hero-orb').forEach((orb) => orb.classList.add('is-visible'));
      canvasRef.current?.classList.add('is-visible');
    }, [], '-=0.9');

    // Scroll Fade Logic moved from App.tsx
    gsap.to('.hero-content', {
      y: -80,
      opacity: 0,
      scale: 0.97,
      ease: 'none',
      scrollTrigger: {
        trigger: section, start: 'top top', end: 'bottom top', scrub: 1.5,
      },
    });
    gsap.to('#hero-particles', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section, start: '60% top', end: 'bottom top', scrub: 1,
      },
    });
    gsap.to('.hero-orb', {
      scale: 1.3,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section, start: '40% top', end: 'bottom top', scrub: 1.2,
      },
    });
  }, { scope: sectionRef, dependencies: [ready] });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!ready || !canvas || !section) return;

    const ctx = canvas.getContext('2d')!;
    const COUNT = 70;
    const CONN = 110;
    const RADIUS = 160;
    let rw = 0;
    let rh = 0;
    const mouse = { x: -9999, y: -9999 };
    interface Particle { x: number; y: number; vx: number; vy: number; r: number; o: number }
    let particles: Particle[] = [];
    let rafId = 0;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rw = rect.width;
      rh = rect.height;
    };

    const seed = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * rw,
        y: Math.random() * rh,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.4 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, rw, rh);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0) {
          const force = (RADIUS - dist) / RADIUS;
          p.vx += (dx / dist) * force * 0.25;
          p.vy += (dy / dist) * force * 0.25;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = rw;
        else if (p.x > rw) p.x = 0;
        if (p.y < 0) p.y = rh;
        else if (p.y > rh) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${p.o * 0.3})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distance < CONN) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,0,0,${0.03 * (1 - distance / CONN)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    resize();
    seed();
    draw();

    const onResize = () => {
      resize();
      seed();
    };
    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', onResize);
    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, [ready]);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!ready || !section || !content) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let rafId = 0;

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      tx = (event.clientX - rect.left - rect.width / 2) / rect.width;
      ty = (event.clientY - rect.top - rect.height / 2) / rect.height;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      gsap.set(content, { x: cx * 14, y: cy * 10 });
      section.querySelectorAll<HTMLElement>('.hero-orb').forEach((orb, i) => {
        gsap.set(orb, { x: cx * (i + 1) * 18, y: cy * (i + 1) * 18 });
      });
      rafId = requestAnimationFrame(tick);
    };

    tick();
    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, [ready]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-end p-6 md:p-10 overflow-hidden"
    >
      <canvas
        id="hero-particles"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div
        className="hero-orb absolute rounded-full pointer-events-none z-0"
        style={{
          width: 'clamp(300px,40vw,600px)', height: 'clamp(300px,40vw,600px)', top: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(248,231,49,0.06), transparent 70%)',
        }}
      />
      <div
        className="hero-orb absolute rounded-full pointer-events-none z-0"
        style={{
          width: 'clamp(200px,30vw,450px)', height: 'clamp(200px,30vw,450px)', bottom: '10%', right: '-5%', background: 'radial-gradient(circle, rgba(248,231,49,0.04), transparent 70%)',
        }}
      />
      <div
        className="hero-orb absolute rounded-full pointer-events-none z-0"
        style={{
          width: 'clamp(150px,20vw,300px)', height: 'clamp(150px,20vw,300px)', top: '40%', left: '50%', background: 'radial-gradient(circle, rgba(26,26,26,0.04), transparent 70%)',
        }}
      />

      <div className="hero-line-v absolute top-0 left-1/2 w-px h-0 bg-black/10 z-[1]" />
      <div className="hero-line-h absolute bottom-[120px] left-0 w-0 h-px bg-black/10 z-[1]" />

      <div ref={contentRef} className="hero-content relative z-[2] flex flex-col md:flex-row gap-8 md:gap-0 mb-[120px]">
        <div className="md:w-1/2 flex items-end">
          <div>
            <Logo size={44} className="mb-4" />
            <h1 className="hero-title text-[12vw] md:text-[8vw] font-serif font-semibold leading-[0.9] tracking-tight">
              {hero.title}
            </h1>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-end md:pl-12">
          <p className="hero-tagline text-lg md:text-xl font-light opacity-0 mb-6 max-w-md" style={{ transform: 'translateY(30px)' }}>
            {hero.tagline}
          </p>
          <div className="flex gap-12 text-xs uppercase tracking-widest opacity-0 hero-meta" style={{ transform: 'translateY(20px)' }}>
            {hero.meta.map((item) => (
              <div key={item.label}>
                <span className="block opacity-40 mb-1">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        id="scroll-indicator"
        className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 z-[2]"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] font-medium">Scroll</span>
        <div className="scroll-cue-line w-px h-10 bg-primary/20 relative overflow-hidden rounded-full">
          <div className="scroll-line-anim absolute inset-x-0 top-0 h-full bg-accent rounded-full" />
        </div>
        <div className="w-2 h-2 rounded-full bg-accent animate-ping opacity-60" />
      </div>
    </section>
  );
}

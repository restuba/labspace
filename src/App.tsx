/* eslint-disable no-plusplus, @typescript-eslint/no-use-before-define, @stylistic/object-curly-newline */
import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { clearLenis, setLenis } from './hooks/useScrollReady';
import { initRevealLines } from './lib/revealLines';
import { initMagnetic } from './lib/magnetic';
import { cta } from './data';

import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutIntro from './components/AboutIntro';
import Projects from './components/Projects';
import ExpertiseHeading from './components/ExpertiseHeading';
import Services from './components/Services';
import Story from './components/Story';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [pageReady, setPageReady] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const revealPage = useCallback(() => setPageReady(true), []);
  const removePreloader = useCallback(() => setPreloaderDone(true), []);

  useEffect(() => {
    if (!pageReady) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    const tick = (time: number) => lenis.raf(time * 1000);
    const disposers: (() => void)[] = [];
    let animations: ReturnType<typeof gsap.context> | undefined;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    const page = document.getElementById('page-wrapper');
    // eslint-disable-next-line prefer-const
    animations = gsap.context(() => {
      initRevealLines(page ?? document);

      ScrollTrigger.create({
        trigger: '#about-intro',
        start: 'top 90%',
        onEnter: () => gsap.to('.scroll-cue', {
          opacity: 0, y: 10, duration: 0.5, ease: 'power2.in',
        }),
      });

      const header = document.getElementById('main-header');
      if (header) {
        ScrollTrigger.create({
          trigger: '#about-intro',
          start: 'top 80%',
          onEnter: () => gsap.to(header, { y: '0%', duration: 0.6, ease: 'power3.out' }),
          onLeaveBack: () => gsap.to(header, { y: '-102%', duration: 0.5, ease: 'power3.in' }),
        });

        document.querySelectorAll<HTMLElement>('.dark-section, .services-wrapper').forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 72px',
            end: 'bottom 72px',
            onEnter: () => header.classList.add('header-dark'),
            onLeave: () => header.classList.remove('header-dark'),
            onEnterBack: () => header.classList.add('header-dark'),
            onLeaveBack: () => header.classList.remove('header-dark'),
          });
        });
      }

      disposers.push(initProjects(), initServices(), initCTA());
      initStory();
      initHeroScrollFade();
      initImageReveal();
      initSectionReveals();
      disposers.push(initMagnetic());
      ScrollTrigger.refresh();
    }, page ?? undefined);

    return () => {
      disposers.reverse().forEach((dispose) => dispose());
      animations?.revert();
      clearLenis(lenis);
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [pageReady]);

  return (
    <>
      {!preloaderDone && (
        <Preloader onReveal={revealPage} onComplete={removePreloader} />
      )}

      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />

      <div id="page-wrapper">
        <Header />
        <main>
          <Hero ready={pageReady} />
          <AboutIntro />
          <Projects />
          <ExpertiseHeading />
          <Services />
          <Story />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}

function initProjects() {
  const wrapper = document.querySelector<HTMLElement>('.project-wrapper');
  if (!wrapper) return () => undefined;

  const cards = gsap.utils.toArray<HTMLElement>('.project-card');
  const total = cards.length;
  const counterEl = document.querySelector<HTMLElement>('.counter-current');
  const progressEl = document.querySelector<HTMLElement>('.project-progress');
  const removeListeners: (() => void)[] = [];
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
        if (counterEl && lastIdx !== idx) {
          counterEl.textContent = String(idx + 1).padStart(2, '0');
          gsap.fromTo(
            counterEl,
            { y: idx > lastIdx ? 12 : -12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', overwrite: true },
          );
          lastIdx = idx;
        }
        if (progressEl) progressEl.style.width = `${p * 100}%`;
      },
    },
  });

  cards.forEach((card, i) => {
    if (i === total - 1) {
      return;
    }
    const img = card.querySelector<HTMLElement>('.project-img');
    const desc = card.querySelector<HTMLElement>('.project-desc');
    const ctaEl = card.querySelector<HTMLElement>('.project-cta');
    const tags = card.querySelectorAll<HTMLElement>('.project-tag');
    const title = card.querySelector<HTMLElement>('.project-title');
    const label = `r${i}`;

    if (desc) tl.to(desc, { opacity: 0, y: -15, duration: 0.3, ease: 'power2.in' }, label);
    if (ctaEl) tl.to(ctaEl, { opacity: 0, duration: 0.25, ease: 'power2.in' }, label);
    if (tags.length) {
      tl.to(tags, {
        opacity: 0, scale: 0.9, stagger: 0.02, duration: 0.2, ease: 'power2.in',
      }, label);
    }
    if (img) tl.to(img, { scale: 1.15, duration: 0.9, ease: 'power2.in' }, `${label}+=0.1`);
    if (title) tl.to(title, { y: -30, opacity: 0, duration: 0.45, ease: 'power3.in' }, `${label}+=0.2`);
    tl.to(card, {
      clipPath: 'inset(0 0 100% 0 round 16px)', duration: 0.8, ease: 'power3.inOut',
    }, `${label}+=0.15`);
    tl.to({}, { duration: 0.12 });
  });

  cards.forEach((card) => {
    const media = card.querySelector<HTMLElement>('.project-media');
    const img = card.querySelector<HTMLElement>('.project-img');
    if (!media || !img) return;

    const onMove = (event: MouseEvent) => {
      const rect = media.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(img, {
        x: x * 12, y: y * 8, duration: 0.7, ease: 'power2.out', overwrite: 'auto',
      });
    };
    const onLeave = () => {
      gsap.to(img, { x: 0, y: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
    };

    media.addEventListener('mousemove', onMove);
    media.addEventListener('mouseleave', onLeave);
    removeListeners.push(() => {
      media.removeEventListener('mousemove', onMove);
      media.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(img);
    });
  });

  return () => removeListeners.forEach((remove) => remove());
}

function initServices() {
  const wrapper = document.querySelector<HTMLElement>('.services-wrapper');
  if (!wrapper) return () => undefined;

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
}

function initStory() {
  const wrapper = document.querySelector<HTMLElement>('.story-wrapper');
  const imageWrap = document.querySelector<HTMLElement>('.story-image-wrap');
  if (!wrapper || !imageWrap) return;

  gsap.to(imageWrap, {
    height: '80vh',
    ease: 'none',
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
    },
  });

  const img = imageWrap.querySelector<HTMLElement>('img');
  if (img) {
    gsap.to(img, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
}

function initHeroScrollFade() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  gsap.to('#hero .hero-content', {
    y: -80,
    opacity: 0,
    scale: 0.97,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.5 },
  });
  gsap.to('#hero-particles', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: '60% top', end: 'bottom top', scrub: 1 },
  });
  gsap.to('#hero .hero-orb', {
    scale: 1.3,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: '40% top', end: 'bottom top', scrub: 1.2 },
  });
}

function initCTA() {
  const glow = document.querySelector<HTMLElement>('.cta-glow');
  const target = document.querySelector<HTMLElement>('.scramble-target');

  if (glow) {
    gsap.to(glow, {
      opacity: 1,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#cta',
        start: 'top 70%',
        end: 'center center',
        scrub: 1,
      },
    });
  }

  if (!target || !cta.scrambleWords.length) return () => undefined;

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
    trigger: '#cta',
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
}

function initImageReveal() {
  const images = gsap.utils.toArray<HTMLElement>('.img-reveal');
  images.forEach((img) => {
    gsap.to(img, {
      clipPath: 'inset(0 0 0 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: img,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

function initSectionReveals() {
  const sections = gsap.utils.toArray<HTMLElement>('[data-section-reveal]');
  sections.forEach((section) => {
    const children = section.querySelectorAll<HTMLElement>('[data-section-reveal-item]');
    if (!children.length) return;
    gsap.from(children, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });
  });
}

import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { clearLenis, setLenis } from './hooks/useScrollReady';
import { initRevealLines } from './lib/revealLines';
import { initMagnetic } from './lib/magnetic';

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

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    const page = document.getElementById('page-wrapper');
    const animations = gsap.context(() => {
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

      disposers.push(initMagnetic());
      ScrollTrigger.refresh();
    }, page ?? undefined);

    return () => {
      disposers.reverse().forEach((dispose) => dispose());
      animations.revert();
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

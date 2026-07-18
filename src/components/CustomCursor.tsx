import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    const pos = { x: -100, y: -100 };
    const vel = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.1, ease: 'power2.out' });
    };

    const tick = () => {
      vel.x += (pos.x - vel.x) * 0.12;
      vel.y += (pos.y - vel.y) * 0.12;
      gsap.set(circle, { x: vel.x, y: vel.y });
    };

    const onEnterLink = () => {
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(circle, { scale: 1.8, opacity: 0.4, duration: 0.4, ease: 'power2.out' });
    };

    const onLeaveLink = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(circle, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' });
    };

    gsap.ticker.add(tick);
    window.addEventListener('mousemove', onMove);

    const links = document.querySelectorAll('a, button, [data-magnetic]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    // Re-attach on DOM changes (for dynamically rendered content)
    const observer = new MutationObserver(() => {
      const newLinks = document.querySelectorAll('a, button, [data-magnetic]');
      newLinks.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('mousemove', onMove);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4, borderRadius: '50%', background: '#fff' }}
      />
      <div
        ref={circleRef}
        className="custom-cursor-circle fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{ width: 36, height: 36, marginLeft: -18, marginTop: -18, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.6)' }}
      />
    </>
  );
}

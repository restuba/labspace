import gsap from 'gsap';

/**
 * Attaches a magnetic hover effect to all elements with [data-magnetic].
 * Returns a cleanup function.
 */
export function initMagnetic(): () => void {
  const elements = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  const cleanups: (() => void)[] = [];

  elements.forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '0.3');

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    cleanups.push(() => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

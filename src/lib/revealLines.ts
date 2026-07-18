import gsap from 'gsap';

/**
 * Wrap every [data-reveal] element's innerHTML in a .reveal-line-inner span
 * and animate it in when it enters the viewport.
 * Safe to call multiple times — skips already-initialised elements.
 */
export function initRevealLines(root: Element | Document = document) {
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((line) => {
    if (line.dataset.rlInit) return;
    line.dataset.rlInit = '1';

    const inner = document.createElement('span');
    inner.className = 'reveal-line-inner';
    inner.innerHTML = line.innerHTML;
    line.innerHTML = '';
    line.appendChild(inner);

    gsap.to(inner, {
      y: '0%',
      rotation: 0,
      opacity: 1,
      duration: 1.4,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 92%',
        once: true,
      },
    });
  });

  // Section lines (decorative horizontal rule that grows in)
  root.querySelectorAll<HTMLElement>('.section-line, .section-line-svc').forEach((line) => {
    if (line.dataset.rlInit) return;
    line.dataset.rlInit = '1';
    gsap.to(line, {
      width: 60,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

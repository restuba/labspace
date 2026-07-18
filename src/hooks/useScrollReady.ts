import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
const listeners: ((lenis: Lenis) => void)[] = [];

export function setLenis(lenis: Lenis) {
  lenisInstance = lenis;
  listeners.splice(0).forEach((listener) => listener(lenis));
}

export function clearLenis(lenis: Lenis) {
  if (lenisInstance === lenis) lenisInstance = null;
}

export function getLenis() {
  return lenisInstance;
}

export function onScrollReady(listener: (lenis: Lenis) => void) {
  if (lenisInstance) {
    listener(lenisInstance);
    return () => undefined;
  }

  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index >= 0) listeners.splice(index, 1);
  };
}

/** Runs once after Lenis and the component DOM are ready. */
export function useScrollReady(setup: () => void | (() => void)) {
  const setupRef = useRef(setup);

  useEffect(() => {
    setupRef.current = setup;
  }, [setup]);

  useEffect(() => {
    let frameId = 0;
    let cleanup: void | (() => void);
    const unsubscribe = onScrollReady(() => {
      frameId = requestAnimationFrame(() => {
        cleanup = setupRef.current();
      });
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(frameId);
      cleanup?.();
    };
  }, []);
}

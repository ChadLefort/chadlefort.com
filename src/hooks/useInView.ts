import { useEffect, useReducer, useRef } from 'react';

type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  respectReducedMotion?: boolean;
};

export const useInView = <T extends HTMLElement>({
  threshold = 0,
  rootMargin = '0px',
  once = true,
  respectReducedMotion = true
}: Options = {}) => {
  const ref = useRef<T | null>(null);
  const [inView, dispatch] = useReducer((_: boolean, value: boolean) => value, false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      dispatch(true);

      return;
    }

    if (respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dispatch(true);

      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(true);

            if (once) io.unobserve(entry.target);
          } else if (!once) {
            dispatch(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(node);

    return () => io.disconnect();
  }, [threshold, rootMargin, once, respectReducedMotion]);

  return [ref, inView] as const;
};

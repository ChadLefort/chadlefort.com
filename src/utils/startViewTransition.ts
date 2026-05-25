import { flushSync } from 'react-dom';

type DocumentWithViewTransition = Document & {
  startViewTransition: (callback: () => void) => { finished: Promise<void> };
};

export const startViewTransition = (update: () => void, onFinished?: () => void) => {
  if (typeof document === 'undefined') {
    update();
    onFinished?.();

    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('startViewTransition' in document)) {
    update();
    onFinished?.();

    return;
  }

  const transition = (document as DocumentWithViewTransition).startViewTransition(() => {
    flushSync(update);
  });

  void transition.finished.then(onFinished).catch(onFinished);
};

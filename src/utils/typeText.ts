type Target = HTMLElement | ((current: string) => void);

type Options = {
  perChar?: number;
  signal?: AbortSignal;
  onComplete?: () => void;
};

export const typeText = (target: Target, text: string, { perChar = 60, signal, onComplete }: Options = {}) => {
  if (signal?.aborted) return;

  const update =
    typeof target === 'function'
      ? target
      : (current: string) => {
          target.textContent = current;
        };

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    update(text);
    onComplete?.();

    return;
  }

  update('');

  let i = 0;
  let timer = 0;

  const tick = () => {
    if (signal?.aborted) return;

    if (i >= text.length) {
      onComplete?.();

      return;
    }

    i += 1;
    update(text.slice(0, i));
    timer = window.setTimeout(tick, perChar);
  };

  signal?.addEventListener('abort', () => window.clearTimeout(timer));

  tick();
};

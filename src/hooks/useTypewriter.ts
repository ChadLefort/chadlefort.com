import { useEffect, useRef, useState } from 'react';
import { typeText } from '~/utils/typeText';

type Options = {
  perChar?: number;
  enabled?: boolean;
  onComplete?: () => void;
};

export const useTypewriter = (text: string, { perChar = 60, enabled = true, onComplete }: Options = {}) => {
  const [typed, setTyped] = useState('');
  const completeRef = useRef(onComplete);

  completeRef.current = onComplete;

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    typeText(setTyped, text, {
      perChar,
      signal: controller.signal,
      onComplete: () => completeRef.current?.()
    });

    return () => controller.abort();
  }, [text, perChar, enabled]);

  return typed;
};

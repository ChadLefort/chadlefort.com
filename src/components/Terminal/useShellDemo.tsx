import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTypewriter } from '~/hooks/useTypewriter';
import { buildAboutLines, createDemoLine, DEMO_COMMAND } from './shell-helpers';
import { type LineBody, setInteractive } from './store';

type Props = {
  years: number;
  interactive: boolean;
  reducedMotion: boolean;
  inView: boolean;
  append: (lines: LineBody[]) => void;
};

export const useShellDemo = ({ years, interactive, reducedMotion, inView, append }: Props) => {
  const [demoComplete, setDemoComplete] = useState(false);
  const finished = interactive || demoComplete;
  const aboutItems = useMemo(() => buildAboutLines(years), [years]);
  const completionTimeoutRef = useRef<number | null>(null);
  const hasOutputRef = useRef(false);

  const showCommandOutput = useCallback(() => {
    if (hasOutputRef.current) return;

    hasOutputRef.current = true;
    append([{ kind: 'cmd', text: DEMO_COMMAND }, ...aboutItems.map((line, index) => createDemoLine(line, index))]);
    setDemoComplete(true);
    setInteractive(true);
  }, [aboutItems, append]);

  useEffect(
    () => () => {
      if (completionTimeoutRef.current !== null) {
        window.clearTimeout(completionTimeoutRef.current);
      }
    },
    []
  );

  const typedFromHook = useTypewriter(DEMO_COMMAND, {
    perChar: 80,
    enabled: !finished && inView,
    onComplete: () => {
      if (reducedMotion) {
        showCommandOutput();
        return;
      }

      completionTimeoutRef.current = window.setTimeout(() => {
        completionTimeoutRef.current = null;
        showCommandOutput();
      }, 200);
    }
  });

  return {
    phase: finished ? 'done' : 'cmd',
    typed: reducedMotion || finished ? DEMO_COMMAND : typedFromHook
  };
};

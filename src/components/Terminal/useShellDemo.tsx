import { useEffect, useMemo, useReducer, useRef } from 'react';
import { useTypewriter } from '~/hooks/useTypewriter';
import { buildAboutLines, createDemoLine, DEMO_COMMAND } from './shell-helpers';
import { type LineBody, setInteractive } from './store';

type DemoPhase = 'cmd' | 'lines' | 'done';

type DemoState = {
  phase: DemoPhase;
  lineIndex: number;
};

type DemoAction = { type: 'start-lines' } | { type: 'advance' } | { type: 'finish'; total: number };

type Props = {
  years: number;
  interactive: boolean;
  reducedMotion: boolean;
  inView: boolean;
  append: (lines: LineBody[]) => void;
};

const createInitialState = (interactive: boolean): DemoState => ({
  phase: interactive ? 'done' : 'cmd',
  lineIndex: 0
});

const reducer = (state: DemoState, action: DemoAction): DemoState => {
  switch (action.type) {
    case 'start-lines':
      return { ...state, phase: 'lines' };
    case 'advance':
      return { ...state, lineIndex: state.lineIndex + 1 };
    case 'finish':
      return { phase: 'done', lineIndex: action.total };
  }
};

export const useShellDemo = ({ years, interactive, reducedMotion, inView, append }: Props) => {
  const [state, dispatch] = useReducer(reducer, interactive, createInitialState);
  const aboutItems = useMemo(() => buildAboutLines(years), [years]);
  const completionTimeoutRef = useRef<number | null>(null);
  const phase = interactive ? 'done' : state.phase;

  useEffect(
    () => () => {
      if (completionTimeoutRef.current !== null) {
        window.clearTimeout(completionTimeoutRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (phase === 'cmd' || completionTimeoutRef.current === null) return;

    window.clearTimeout(completionTimeoutRef.current);
    completionTimeoutRef.current = null;
  }, [phase]);

  const typedFromHook = useTypewriter(DEMO_COMMAND, {
    perChar: 80,
    enabled: phase === 'cmd' && !reducedMotion && inView,
    onComplete: () => {
      completionTimeoutRef.current = window.setTimeout(() => {
        completionTimeoutRef.current = null;
        append([{ kind: 'cmd', text: DEMO_COMMAND }]);
        dispatch({ type: 'start-lines' });
      }, 200);
    }
  });

  useEffect(() => {
    if (phase !== 'lines') return;

    if (reducedMotion) {
      append(aboutItems.map((line, index) => createDemoLine(line, index, false)));
      dispatch({ type: 'finish', total: aboutItems.length });
      setInteractive(true);

      return;
    }

    if (state.lineIndex >= aboutItems.length) {
      dispatch({ type: 'finish', total: aboutItems.length });
      setInteractive(true);

      return;
    }

    const id = window.setTimeout(() => {
      append([createDemoLine(aboutItems[state.lineIndex], state.lineIndex, true)]);
      dispatch({ type: 'advance' });
    }, 35);

    return () => window.clearTimeout(id);
  }, [aboutItems, append, phase, reducedMotion, state.lineIndex]);

  return {
    phase,
    typed: reducedMotion ? DEMO_COMMAND : typedFromHook
  };
};

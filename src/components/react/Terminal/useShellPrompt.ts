import type { ComponentProps, KeyboardEvent } from 'react';
import { useState } from 'react';
import type { CommandCtx } from './commands';
import { commands } from './commands';
import { COMMANDS } from './complete';
import { buildUnknownCommandText, completeFromCwd } from './shell-helpers';
import {
  type LineBody,
  pushHistory as storePushHistory,
  setCwd as storeSetCwd,
  setLines as storeSetLines
} from './store';
import { type FsDir, nodeAt } from './vfs';

type Props = {
  root: FsDir;
  cwd: string[];
  history: string[];
  years: number;
  time: string | null;
  append: (lines: LineBody[]) => void;
  goTo: (route: string) => void;
};

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];
type CompletionResult = { kind: 'input'; value: string } | { kind: 'output'; value: string } | null;

const updateLastToken = (tokens: string[], nextValue: string) => {
  const nextTokens = [...tokens];

  nextTokens[nextTokens.length - 1] = nextValue;

  return nextTokens.join('');
};

const completeCommandToken = (tokens: string[], last: string): CompletionResult => {
  if (!last) return null;

  const matches = COMMANDS.filter((command) => command.startsWith(last.toLowerCase()));

  if (matches.length === 1) {
    return { kind: 'input', value: updateLastToken(tokens, `${matches[0]} `) };
  }

  if (matches.length > 1) {
    return { kind: 'output', value: matches.join('  ') };
  }

  return null;
};

const completePathToken = (root: FsDir, cwd: string[], tokens: string[], last: string): CompletionResult => {
  if (!last) return null;

  const { matches, common } = completeFromCwd(root, cwd, last);

  if (matches.length === 0) return null;

  if (matches.length === 1) {
    const onlyMatch = matches[0];
    const child = nodeAt(root, [...cwd, onlyMatch]);
    const suffix = child?.type === 'dir' ? '/' : ' ';

    return { kind: 'input', value: updateLastToken(tokens, onlyMatch + suffix) };
  }

  if (common.length > last.length) {
    return { kind: 'input', value: updateLastToken(tokens, common) };
  }

  return { kind: 'output', value: matches.join('  ') };
};

const applyCompletionResult = (
  result: CompletionResult,
  setInput: (value: string) => void,
  append: Props['append']
) => {
  if (!result) return;

  if (result.kind === 'input') {
    setInput(result.value);
    return;
  }

  append([{ kind: 'out', text: result.value }]);
};

export const useShellPrompt = ({ root, cwd, history, years, time, append, goTo }: Props) => {
  const [input, setInput] = useState('');
  const [histIdx, setHistIdx] = useState<number | null>(null);

  const tryComplete = () => {
    const tokens = input.split(/(\s+)/);
    const last = tokens[tokens.length - 1] ?? '';
    const isFirstToken = tokens.filter((token) => token.trim()).length <= 1;

    if (!input.trim()) {
      append([{ kind: 'out', text: COMMANDS.join('  ') }]);
      return;
    }

    const result = isFirstToken
      ? (completeCommandToken(tokens, last) ?? completePathToken(root, cwd, tokens, last))
      : completePathToken(root, cwd, tokens, last);

    applyCompletionResult(result, setInput, append);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();

    append([
      { kind: 'status', cwd: [...cwd], time },
      { kind: 'cmd', text: raw, cwd: [...cwd] }
    ]);

    if (!cmd) return;

    const nextHistory = [...history, cmd];
    storePushHistory(cmd);

    const [name, ...args] = cmd.split(/\s+/);
    const handler = commands[name];

    if (handler) {
      const ctx: CommandCtx = {
        root,
        cwd,
        setCwd: storeSetCwd,
        append,
        setLines: storeSetLines,
        history: nextHistory,
        years,
        goTo
      };

      handler(args, ctx, name);
      return;
    }

    append([{ kind: 'err', text: buildUnknownCommandText(name) }]);
  };

  const recallPreviousHistory = () => {
    if (history.length === 0) return;

    const next = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);

    setHistIdx(next);
    setInput(history[next] ?? '');
  };

  const recallNextHistory = () => {
    if (histIdx === null) return;

    const next = histIdx + 1;

    if (next >= history.length) {
      setHistIdx(null);
      setInput('');

      return;
    }

    setHistIdx(next);
    setInput(history[next]);
  };

  const clearOutput = () => {
    storeSetLines([]);
  };

  const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Tab':
        if (!input) return;

        event.preventDefault();
        tryComplete();
        return;
      case 'ArrowUp':
        event.preventDefault();
        recallPreviousHistory();
        return;
      case 'ArrowDown':
        event.preventDefault();
        recallNextHistory();
        return;
      default:
        if (event.ctrlKey && event.key === 'l') {
          event.preventDefault();
          clearOutput();
        }
    }
  };

  const onSubmit = (event: FormSubmitEvent) => {
    event.preventDefault();
    run(input);
    setInput('');
    setHistIdx(null);
  };

  return {
    input,
    setInput,
    onKey,
    onSubmit
  };
};

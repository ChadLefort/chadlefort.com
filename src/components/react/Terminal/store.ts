import type { ReactNode } from 'react';
import { atom, computed } from 'nanostores';
import { INITIAL_CWD } from './vfs';

export type LineBody =
  | { kind: 'cmd'; text: string; cwd?: string[] }
  | { kind: 'out'; text: string }
  | { kind: 'err'; text: string }
  | { kind: 'success'; text: string }
  | { kind: 'status'; cwd?: string[]; time?: string | null }
  | { kind: 'node'; node: ReactNode };

export type Line = LineBody & { id: string };

const initialLines = (): Line[] => [
  { id: 'ln-init-1', kind: 'success', text: '✓ chadlefort.com shell ready' },
  { id: 'ln-init-3', kind: 'out', text: "type 'help' for commands · 'ls' to look around · 'open <name>' to navigate" }
];

export const $lines = atom<Line[]>(initialLines());
export const $cwd = atom<string[]>([...INITIAL_CWD]);
export const $history = atom<string[]>([]);
export const $lineSeq = atom<number>(3);
export const $maximized = atom<boolean>(false);
export const $minimized = atom<boolean>(false);
export const $closed = atom<boolean>(false);
// false → typewriter demo. Toggled true via maximize click or Konami.
export const $interactive = atom<boolean>(false);

export const appendLines = (newLines: LineBody[]) => {
  let seq = $lineSeq.get();
  const withIds: Line[] = newLines.map((l) => {
    seq += 1;

    return { ...l, id: `ln-${seq}` } as Line;
  });

  $lines.set([...$lines.get(), ...withIds]);
  $lineSeq.set(seq);
};

export const setLines = (lines: Line[]) => $lines.set(lines);
export const setCwd = (cwd: string[]) => $cwd.set(cwd);
export const pushHistory = (cmd: string) => $history.set([...$history.get(), cmd]);
export const setMaximized = (next: boolean) => $maximized.set(next);
export const setMinimized = (next: boolean) => $minimized.set(next);
export const setClosed = (next: boolean) => $closed.set(next);
export const setInteractive = (next: boolean) => $interactive.set(next);

export const $hasOutput = computed($lines, (lines) => lines.length > 0);

export const resetShellStore = () => {
  $lines.set(initialLines());
  $cwd.set([...INITIAL_CWD]);
  $history.set([]);
  $lineSeq.set(3);
  $maximized.set(false);
  $minimized.set(false);
  $closed.set(false);
  $interactive.set(false);
};

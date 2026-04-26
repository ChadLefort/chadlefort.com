import type { Line, LineBody } from '../store';
import type { FsDir } from '../vfs';

export type CommandCtx = {
  root: FsDir;
  cwd: string[];
  setCwd: (cwd: string[]) => void;
  append: (lines: LineBody[]) => void;
  setLines: (lines: Line[]) => void;
  history: string[];
  years: number;
  goTo: (route: string) => void;
};

export type Command = (args: string[], ctx: CommandCtx, name: string) => void;

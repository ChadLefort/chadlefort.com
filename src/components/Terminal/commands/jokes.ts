import type { Command } from './types';

let editorAttempted = false;

const NVIM_QUIPS = [
  'skill issue. just :q!',
  'blazingly fast escape: smash :q!.',
  'vim btw. fine, :q! and we move.',
  'E37: No write since last change. (try :q! to force)',
  '13+ years and still googling "how to quit vim".'
];

const QUIPS: Record<string, string[]> = {
  vim: NVIM_QUIPS,
  nvim: NVIM_QUIPS,
  vi: NVIM_QUIPS,
  nano: ['nano? skill issue. but okay.', 'nano users when they discover nvim: 🤯'],
  emacs: ["emacs? that's not an editor, that's an OS."]
};

const pick = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const editor: Command = (_args, ctx, name) => {
  editorAttempted = true;
  const quips = QUIPS[name] ?? NVIM_QUIPS;

  ctx.append([{ kind: 'err', text: pick(quips) }]);
};

export const exit: Command = (_args, ctx, name) => {
  if (editorAttempted) {
    editorAttempted = false;
    ctx.append([{ kind: 'success', text: `✓ ${name} — wrote 0 bytes. you escaped.` }]);

    return;
  }

  if (name.startsWith(':') || name === 'ZZ' || name === 'ZQ') {
    ctx.append([{ kind: 'out', text: 'nothing to save. nothing to quit.' }]);
    return;
  }

  ctx.append([{ kind: 'out', text: "nope, you're stuck here." }]);
};

export const sudo: Command = (args, ctx) => {
  if (args.join(' ') === 'make me a sandwich') {
    ctx.append([{ kind: 'success', text: '🥪 okay.' }]);
    return;
  }

  ctx.append([{ kind: 'err', text: 'chad is not in the sudoers file. this incident will be reported.' }]);
};

export const rm: Command = (args, ctx) => {
  if (args.includes('-rf') && args.some((a) => a === '/' || a === '/*')) {
    ctx.append([{ kind: 'err', text: 'rm: it is too late. you have my pity.' }]);
    return;
  }

  ctx.append([{ kind: 'err', text: 'nice try.' }]);
};

export const sandwich: Command = (_args, ctx) => {
  ctx.append([{ kind: 'out', text: 'what? make it yourself. (try `sudo make me a sandwich`)' }]);
};

export const forkBomb: Command = (_args, ctx) => {
  ctx.append([{ kind: 'err', text: ':(){ :|:& };: — nice try. fork bomb blocked.' }]);
};

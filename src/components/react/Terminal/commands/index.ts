import { cat } from './cat';
import { cd } from './cd';
import { clear } from './clear';
import { contact } from './contact';
import { date } from './date';
import { echo } from './echo';
import { editor, exit, forkBomb, rm, sandwich, sudo } from './jokes';
import { git } from './git';
import { help } from './help';
import { history } from './history';
import { ls } from './ls';
import { neofetch } from './neofetch';
import { open } from './open';
import { pwd } from './pwd';
import { socials } from './socials';
import { tree } from './tree';
import { whoami } from './whoami';
import type { Command } from './types';

export const commands: Record<string, Command> = {
  ls,
  l: ls,
  ll: ls,
  la: ls,
  cd,
  cat,
  pwd,
  tree,
  open,
  whoami,
  echo,
  date,
  history,
  clear,
  help,
  git,
  contact,
  socials,
  links: socials,
  neofetch,
  fastfetch: neofetch,
  screenfetch: neofetch,
  sudo,
  rm,
  make: sandwich,
  ':(){': forkBomb,
  vi: editor,
  vim: editor,
  nvim: editor,
  nano: editor,
  emacs: editor,
  exit,
  ':q': exit,
  ':q!': exit,
  ':wq': exit,
  ':wq!': exit,
  ':wqa': exit,
  ':bd': exit,
  ZZ: exit,
  ZQ: exit
};

export type { Command, CommandCtx } from './types';
export { HELP_LINES } from './help';

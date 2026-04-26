import type { Command } from './types';

export const HELP_LINES = [
  'available commands:',
  '  ls [-la] [path]    list directory',
  '  cd <path>          change directory',
  '  cat <file>         print file',
  '  pwd                show current path',
  '  tree               recursive listing',
  '  open <name>        navigate to page or project',
  '  whoami             current user',
  '  echo <text>        print text',
  '  date               current date/time',
  '  history            previous commands',
  '  clear              clear screen',
  '  help               this message',
  '  contact            email + socials',
  '  socials            list social links',
  '  neofetch           system info card',
  '',
  'tab completes · ↑/↓ recalls history · ctrl+l clears'
];

export const help: Command = (_args, ctx) => {
  ctx.append(HELP_LINES.map((text) => ({ kind: 'out' as const, text })));
};

import { MdRow } from '../MdRow';
import { parseMd } from '../markdown';
import { isMdFile, nodeAt, resolvePath } from '../vfs';
import type { Command } from './types';

export const cat: Command = (args, ctx) => {
  if (!args[0]) {
    ctx.append([{ kind: 'err', text: 'cat: missing file operand' }]);
    return;
  }

  const path = resolvePath(ctx.cwd, args[0]);
  const node = path ? nodeAt(ctx.root, path) : null;

  if (!node) {
    ctx.append([{ kind: 'err', text: `cat: ${args[0]}: no such file or directory` }]);
    return;
  }

  if (node.type !== 'file') {
    ctx.append([{ kind: 'err', text: `cat: ${args[0]}: is a directory` }]);
    return;
  }

  const content = node.content();

  if (isMdFile(node.name)) {
    ctx.append(parseMd(content).map((line) => ({ kind: 'node' as const, node: <MdRow line={line} /> })));
  } else {
    ctx.append(content.split('\n').map((text) => ({ kind: 'out' as const, text })));
  }
};

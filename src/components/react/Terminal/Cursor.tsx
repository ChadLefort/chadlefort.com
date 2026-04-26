import type { FC } from 'react';

type Props = { char?: string };

// Sized to 1ch × 1.15em so the block matches surrounding monospace glyphs
// instead of stretching to full line-height.
export const Cursor: FC<Props> = ({ char }) => (
  <span
    aria-hidden="true"
    className="blink bg-term-fg text-term-bg inline-block text-center align-text-bottom font-mono leading-none"
    style={{ minWidth: '1ch', height: '1.15em', lineHeight: '1.15em' }}
  >
    {char || ' '}
  </span>
);

import type { FC } from 'react';

export const Cursor: FC = () => (
  <span aria-hidden="true" className="blink bg-fg ml-[1px] inline-block h-[1.05em] w-[0.6em] translate-y-[2px]" />
);

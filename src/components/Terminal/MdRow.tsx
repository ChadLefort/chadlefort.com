import type { FC } from 'react';

export type MdLine =
  | { kind: 'h1'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'li'; text: string }
  | { kind: 'bq'; text: string }
  | { kind: 'blank' };

type Props = { line: MdLine };

export const MdRow: FC<Props> = ({ line }) => {
  if (line.kind === 'blank') return <p className="m-0 h-[0.6em]" aria-hidden="true" />;

  if (line.kind === 'h1') {
    return (
      <p className="m-0 font-semibold">
        <span className="text-term-prompt"># </span>
        <span className="text-term-fg">{line.text}</span>
      </p>
    );
  }

  if (line.kind === 'h2') {
    return (
      <p className="m-0 font-semibold">
        <span className="text-term-prompt">## </span>
        <span className="text-term-fg">{line.text}</span>
      </p>
    );
  }

  if (line.kind === 'li') {
    return (
      <p className="m-0">
        <span className="text-term-prompt">- </span>
        <span className="text-term-comment">{line.text}</span>
      </p>
    );
  }

  if (line.kind === 'bq') {
    return (
      <p className="m-0">
        <span className="text-term-prompt">&gt; </span>
        <span className="text-term-comment">{line.text}</span>
      </p>
    );
  }

  return <p className="text-term-comment m-0">{line.text}</p>;
};

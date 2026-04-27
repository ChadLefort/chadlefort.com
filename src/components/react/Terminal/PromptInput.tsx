import type { FC, KeyboardEvent, RefObject, SyntheticEvent } from 'react';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { Cursor } from './Cursor';

const promptInputWrap = tv({ base: 'relative flex flex-1 cursor-text items-center' });
const hiddenInput = tv({
  base: 'absolute inset-0 w-full bg-transparent font-mono text-[16px] text-transparent caret-transparent outline-none'
});

type Props = {
  value: string;
  onChange: (next: string) => void;
  onKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

export const PromptInput: FC<Props> = ({ value, onChange, onKey, inputRef }) => {
  const [caret, setCaret] = useState(0);

  const sync = (e: SyntheticEvent<HTMLInputElement>) => {
    setCaret(e.currentTarget.selectionStart ?? value.length);
  };

  const safeCaret = Math.min(caret, value.length);
  const before = value.slice(0, safeCaret);
  const at = value[safeCaret] ?? '';
  const after = at ? value.slice(safeCaret + 1) : '';

  return (
    <label className={promptInputWrap()}>
      <span className="font-mono whitespace-pre">
        <span>{before}</span>
        <Cursor char={at} />
        <span>{after}</span>
      </span>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setCaret(e.target.selectionStart ?? e.target.value.length);
        }}
        onKeyDown={onKey}
        onKeyUp={sync}
        onClick={sync}
        onSelect={sync}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        className={hiddenInput()}
        aria-label="terminal input"
      />
    </label>
  );
};

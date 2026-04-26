import type { FC } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const light = tv({
  base: [
    'group inline-flex h-3 w-3 items-center justify-center rounded-full',
    'text-[8px] font-bold text-black/55',
    'shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]',
    'transition-opacity hover:opacity-90',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
  ],
  variants: {
    color: {
      red: 'bg-mac-red focus-visible:outline-mac-red',
      yellow: 'bg-mac-yellow focus-visible:outline-mac-yellow',
      green: 'bg-mac-green focus-visible:outline-mac-green'
    }
  }
});

type LightColor = NonNullable<VariantProps<typeof light>['color']>;

type LightProps = {
  color: LightColor;
  label: string;
  onClick?: () => void;
  glyph: string;
};

const Light: FC<LightProps> = ({ color, label, onClick, glyph }) => (
  <button type="button" onClick={onClick} aria-label={label} className={light({ color })}>
    <span aria-hidden="true" className="opacity-0 group-hover/lights:opacity-100">
      {glyph}
    </span>
  </button>
);

type Props = {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
};

export const TrafficLights: FC<Props> = ({ onClose, onMinimize, onMaximize, maximized }) => (
  <div className="group/lights mr-1 flex shrink-0 items-center gap-[7px] pr-3 pl-1 sm:mr-2 sm:pr-4 sm:pl-2">
    <Light color="red" label="Close terminal" onClick={onClose} glyph="×" />
    <Light color="yellow" label="Minimize terminal" onClick={onMinimize} glyph="−" />
    <Light
      color="green"
      label={maximized ? 'Exit maximized terminal' : 'Maximize terminal (interactive shell)'}
      onClick={onMaximize}
      glyph={maximized ? '↙' : '↗'}
    />
  </div>
);

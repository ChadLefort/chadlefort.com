import type { FC } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const light = tv({
  base: [
    'inline-flex h-6 w-6 items-center justify-center rounded-full',
    'transition-opacity hover:opacity-90',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
  ],
  variants: {
    color: {
      red: 'focus-visible:outline-mac-red',
      yellow: 'focus-visible:outline-mac-yellow',
      green: 'focus-visible:outline-mac-green'
    }
  }
});

const dot = tv({
  base: [
    'inline-flex h-3 w-3 items-center justify-center rounded-full',
    'text-[8px] font-bold text-black/55',
    'shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]'
  ],
  variants: {
    color: {
      red: 'bg-mac-red',
      yellow: 'bg-mac-yellow',
      green: 'bg-mac-green'
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
    <span aria-hidden="true" className={dot({ color })}>
      <span className="opacity-0 group-hover/lights:opacity-100">{glyph}</span>
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
  <div className="group/lights -ml-[6px] flex shrink-0 items-center">
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

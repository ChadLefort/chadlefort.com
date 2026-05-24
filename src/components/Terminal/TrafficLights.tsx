import type { FC } from 'react';
import { Button as RACButton } from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

const light = tv({
  base: [
    'inline-flex h-6 w-6 items-center justify-center rounded-full',
    'transition-opacity',
    'outline outline-2 outline-offset-2'
  ],
  variants: {
    color: {
      red: 'outline-mac-red',
      yellow: 'outline-mac-yellow',
      green: 'outline-mac-green'
    },
    isFocusVisible: {
      false: 'outline-0'
    },
    isHovered: {
      true: 'opacity-90'
    }
  }
});

const dot = tv({
  base: [
    'inline-flex h-3 w-3 items-center justify-center rounded-full',
    'text-[8px] font-bold text-ink-950/55',
    'shadow-[inset_0_0_0_0.5px_var(--border)]'
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
  <RACButton onPress={onClick} aria-label={label} className={(renderProps) => light({ ...renderProps, color })}>
    <span aria-hidden="true" className={dot({ color })}>
      <span className="opacity-0 group-hover/lights:opacity-100">{glyph}</span>
    </span>
  </RACButton>
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

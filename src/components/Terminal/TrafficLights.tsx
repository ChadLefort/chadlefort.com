import type { FC } from 'react';
import { Button as RACButton } from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';
import { focusRing } from '~/utils/focusRing';

const light = tv({
  extend: focusRing,
  base: ['absolute -inset-2 inline-flex items-center justify-center rounded-full', 'transition-opacity'],
  variants: {
    isHovered: {
      true: 'opacity-90'
    }
  }
});

const dot = tv({
  base: [
    'inline-flex size-3.5 items-center justify-center rounded-full',
    'text-[9px] font-bold text-ink-950/55',
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

type LightColor = NonNullable<VariantProps<typeof dot>['color']>;

type LightProps = {
  color: LightColor;
  label: string;
  onClick?: () => void;
  glyph: string;
};

const Light: FC<LightProps> = ({ color, label, onClick, glyph }) => (
  <span className="relative inline-flex size-3.5 shrink-0 items-center justify-center">
    <RACButton onPress={onClick} aria-label={label} className={(renderProps) => light(renderProps)}>
      <span aria-hidden="true" className={dot({ color })}>
        <span className="opacity-0 group-hover/lights:opacity-100">{glyph}</span>
      </span>
    </RACButton>
  </span>
);

type Props = {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
};

export const TrafficLights: FC<Props> = ({ onClose, onMinimize, onMaximize, maximized }) => (
  <div className="group/lights flex shrink-0 items-center gap-3">
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

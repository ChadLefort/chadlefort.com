import type { FC, ReactNode } from 'react';
import { m, LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { Button as RACButton, composeRenderProps, type ButtonProps } from 'react-aria-components';

import { buttonStyles } from '../Button/Button';
import type { IconButtonStyleProps } from './types';

const MotionRACButton = m.create(RACButton);

const motionPress = {
  whileHover: { scale: 1.08 },
  whileTap: { scale: 0.92 },
  transition: { type: 'spring', stiffness: 420, damping: 20 }
} as const;

type ConflictingHandlers =
  | 'style'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onHoverStart'
  | 'onHoverEnd';

type Props = Omit<ButtonProps, 'className' | 'children' | ConflictingHandlers> &
  IconButtonStyleProps & {
    label: string;
    icon: ReactNode;
    className?: string;
  };

export const IconButton: FC<Props> = ({
  label,
  icon,
  variant = 'ghost',
  color = 'neutral',
  size = 'md',
  className,
  ...props
}) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <MotionRACButton
        {...motionPress}
        {...props}
        aria-label={label}
        className={composeRenderProps(className, (extra, renderProps) =>
          buttonStyles({ ...renderProps, variant, color, size, shape: 'icon', className: extra })
        )}
      >
        <span aria-hidden="true">{icon}</span>
      </MotionRACButton>
    </MotionConfig>
  </LazyMotion>
);

import type { FC, ReactNode } from 'react';
import { type ButtonProps, composeRenderProps, Button as RACButton } from 'react-aria-components';

import { buttonStyles } from '../Button/Button';
import type { IconButtonStyleProps } from './types';

type Props = Omit<ButtonProps, 'className' | 'children'> &
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
  <RACButton
    {...props}
    aria-label={label}
    className={composeRenderProps(className, (extra, renderProps) =>
      buttonStyles({
        ...renderProps,
        variant,
        color,
        size,
        shape: 'icon',
        press: 'bouncy',
        className: extra
      })
    )}
  >
    <span aria-hidden="true">{icon}</span>
  </RACButton>
);

import type { FC, ReactNode } from 'react';
import type { LinkProps as RACLinkProps } from 'react-aria-components';
import { composeRenderProps, Link as RACLink } from 'react-aria-components';
import type { ButtonStyleProps } from './Button';
import { buttonStyles } from './Button';

type Props = Omit<RACLinkProps, 'className' | 'children'> &
  ButtonStyleProps & {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    children?: ReactNode;
    className?: string;
  };

export const ButtonLink: FC<Props> = ({
  variant = 'solid',
  color = 'brand',
  size = 'md',
  shape = 'default',
  press = 'bouncy',
  fullWidth,
  startIcon,
  endIcon,
  children,
  className,
  ...props
}) => (
  <RACLink
    {...props}
    className={composeRenderProps(className, (extra, renderProps) =>
      buttonStyles({ ...renderProps, variant, color, size, shape, press, fullWidth, className: extra })
    )}
  >
    {startIcon ? <span aria-hidden="true">{startIcon}</span> : null}
    {children}
    {endIcon ? <span aria-hidden="true">{endIcon}</span> : null}
  </RACLink>
);

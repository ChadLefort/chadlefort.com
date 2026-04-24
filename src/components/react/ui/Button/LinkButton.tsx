import type { FC, ReactNode } from 'react';
import { Link as RACLink, composeRenderProps, type LinkProps as RACLinkProps } from 'react-aria-components';

import { buttonStyles } from './Button';
import type { ButtonStyleProps } from './types';

type Props = Omit<RACLinkProps, 'className' | 'children'> &
  ButtonStyleProps & {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    children?: ReactNode;
    className?: string;
  };

export const LinkButton: FC<Props> = ({
  variant,
  color,
  size,
  shape,
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
      buttonStyles({ ...renderProps, variant, color, size, shape, fullWidth, className: extra })
    )}
  >
    {startIcon ? <span aria-hidden="true">{startIcon}</span> : null}
    {children ? <span>{children}</span> : null}
    {endIcon ? <span aria-hidden="true">{endIcon}</span> : null}
  </RACLink>
);

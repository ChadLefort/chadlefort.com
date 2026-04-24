import type { FC, ReactNode } from 'react';
import {
  Button as RACButton,
  Link as RACLink,
  composeRenderProps,
  type ButtonProps as RACButtonProps,
  type LinkProps as RACLinkProps
} from 'react-aria-components';
import { buttonStyles, type ButtonStyleProps } from '~/utils/styles';

type CommonProps = NonNullable<ButtonStyleProps> & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children?: ReactNode;
};

type ButtonProps = Omit<RACButtonProps, 'className'> &
  CommonProps & {
    className?: string;
  };

type LinkButtonProps = Omit<RACLinkProps, 'className'> &
  CommonProps & {
    className?: string;
  };

const renderInner = (startIcon: ReactNode, endIcon: ReactNode, children: ReactNode) => (
  <>
    {startIcon ? <span aria-hidden="true">{startIcon}</span> : null}
    {children ? <span>{children}</span> : null}
    {endIcon ? <span aria-hidden="true">{endIcon}</span> : null}
  </>
);

export const Button: FC<ButtonProps> = ({
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
  <RACButton
    {...props}
    className={composeRenderProps(className, (extra, renderProps) =>
      buttonStyles({ ...renderProps, variant, color, size, shape, fullWidth, className: extra })
    )}
  >
    {renderInner(startIcon, endIcon, children)}
  </RACButton>
);

export const LinkButton: FC<LinkButtonProps> = ({
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
    {renderInner(startIcon, endIcon, children)}
  </RACLink>
);

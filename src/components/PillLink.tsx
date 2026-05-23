import type { FC, ReactNode } from 'react';
import { composeRenderProps, Link as RACLink, type LinkProps as RACLinkProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

export const pillLinkStyles = tv({
  base: [
    'group card card-hover text-fg',
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent'
  ]
});

type Props = Omit<RACLinkProps, 'className' | 'children'> & {
  children?: ReactNode;
  className?: string;
};

export const PillLink: FC<Props> = ({ children, className, ...props }) => (
  <RACLink
    {...props}
    className={composeRenderProps(className, (extra, renderProps) =>
      pillLinkStyles({ ...renderProps, className: extra })
    )}
  >
    {children}
  </RACLink>
);

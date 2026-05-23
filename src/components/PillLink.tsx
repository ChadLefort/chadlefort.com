import type { FC, ReactNode } from 'react';
import { composeRenderProps, Link as RACLink, type LinkProps as RACLinkProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

export const pillLinkStyles = tv({
  base: [
    'group card card-hover text-fg',
    'inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold sm:min-h-0 sm:px-3 sm:py-1.5',
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

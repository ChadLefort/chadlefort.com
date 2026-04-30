import type { FC, ReactNode } from 'react';
import { composeRenderProps, Link as RACLink, type LinkProps as RACLinkProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

export const pillLinkStyles = tv({
  base: [
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition',
    'border-glass-border bg-glass text-fg hover:bg-glass-strong border',
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

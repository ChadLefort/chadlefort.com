import type { FC, ReactNode } from 'react';
import { composeRenderProps, Link as RACLink, type LinkProps as RACLinkProps } from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

const ctaStyles = tv({
  base: [
    'group inline-flex items-center font-semibold transition-[color,background-color,border-color,transform] duration-[var(--motion-duration-state)] ease-[var(--motion-ease-settle)]',
    'hover:-translate-y-px active:translate-y-0 motion-reduce:hover:translate-y-0',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent'
  ],
  variants: {
    intent: {
      primary: 'border border-accent-strong bg-accent-strong text-overlay-fg hover:border-accent hover:bg-accent',
      secondary: 'border border-panel-border bg-term-bg text-term-fg hover:border-accent hover:text-fg'
    },
    size: {
      md: 'gap-2 rounded-xl px-6 py-3',
      lg: 'gap-3 rounded-xl px-8 py-4 text-lg font-bold'
    }
  },
  defaultVariants: { intent: 'primary', size: 'md' }
});

type CTAVariants = VariantProps<typeof ctaStyles>;

type CTAStyleProps = {
  intent?: CTAVariants['intent'];
  size?: CTAVariants['size'];
};

type Props = Omit<RACLinkProps, 'className' | 'children'> &
  CTAStyleProps & {
    children?: ReactNode;
    className?: string;
    download?: boolean | string;
  };

export const CTALink: FC<Props> = ({ intent, size, children, className, download, ...props }) => (
  <RACLink
    {...props}
    download={download}
    className={composeRenderProps(className, (extra, renderProps) =>
      ctaStyles({ ...renderProps, intent, size, className: extra })
    )}
  >
    {children}
  </RACLink>
);

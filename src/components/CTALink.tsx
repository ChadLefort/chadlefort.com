import type { FC, ReactNode } from 'react';
import { composeRenderProps, Link as RACLink, type LinkProps as RACLinkProps } from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

const ctaStyles = tv({
  base: [
    'group inline-flex items-center font-semibold transition-all duration-200',
    'hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent'
  ],
  variants: {
    intent: {
      primary: 'bg-accent-strong hover:bg-accent text-white',
      secondary: 'border-glass-border-strong bg-glass text-fg hover:border-accent border'
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

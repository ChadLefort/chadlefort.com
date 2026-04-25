import type { FC, ReactNode } from 'react';
import { m, LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { Button as RACButton, composeRenderProps, type ButtonProps as RACButtonProps } from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

const MotionRACButton = m.create(RACButton);

const motionPress = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.96 },
  transition: { type: 'spring', stiffness: 420, damping: 22 }
} as const;

const focusRing = tv({
  base: 'outline outline-accent outline-offset-[3px] forced-colors:outline-[Highlight]',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2'
    }
  }
});

export const buttonStyles = tv({
  extend: focusRing,
  base: [
    'inline-flex items-center justify-center gap-2 cursor-pointer',
    'font-semibold tracking-tight select-none',
    'transition-[background-color,color,box-shadow] duration-150 ease-out',
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60'
  ],
  variants: {
    variant: {
      solid: 'text-white shadow-lg shadow-black/20',
      outline: 'border-2 bg-transparent',
      ghost: 'border-2 border-transparent',
      unstyled: ['bg-transparent border-none text-current p-0', 'data-[hovered]:opacity-85']
    },
    color: {
      brand: '',
      neutral: '',
      term: ''
    },
    size: {
      sm: 'px-3 py-1.5 text-sm rounded-lg min-h-9',
      md: 'px-5 py-2.5 text-base rounded-lg min-h-11',
      lg: 'px-7 py-3 text-lg rounded-xl min-h-14'
    },
    shape: {
      default: '',
      pill: 'rounded-full',
      icon: 'rounded-full p-0 aspect-square'
    },
    fullWidth: {
      true: 'w-full'
    }
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'brand',
      class: ['bg-accent-strong', 'data-[hovered]:bg-accent', 'data-[pressed]:bg-accent-strong']
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: ['bg-ink-950 text-ink-100', 'data-[hovered]:bg-ink-800']
    },
    {
      variant: 'solid',
      color: 'term',
      class: [
        'bg-terminal-bg text-terminal-fg border border-ink-500',
        'data-[hovered]:border-terminal-blue data-[hovered]:text-white'
      ]
    },
    {
      variant: 'outline',
      color: 'brand',
      class: ['text-accent border-accent', 'data-[hovered]:bg-accent/10']
    },
    {
      variant: 'outline',
      color: 'neutral',
      class: ['text-fg border-border-subtle', 'data-[hovered]:bg-surface-alt']
    },
    {
      variant: 'ghost',
      color: 'brand',
      class: ['text-accent', 'data-[hovered]:bg-accent/10']
    },
    {
      variant: 'ghost',
      color: 'neutral',
      class: ['text-fg', 'data-[hovered]:bg-surface-alt']
    },
    { shape: 'icon', size: 'sm', class: 'h-9 w-9 min-h-0' },
    { shape: 'icon', size: 'md', class: 'h-11 w-11 min-h-0' },
    { shape: 'icon', size: 'lg', class: 'h-14 w-14 min-h-0' }
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'brand',
    size: 'md',
    shape: 'default'
  }
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

export type ButtonStyleProps = {
  variant?: ButtonVariants['variant'];
  color?: ButtonVariants['color'];
  size?: ButtonVariants['size'];
  shape?: ButtonVariants['shape'];
  fullWidth?: ButtonVariants['fullWidth'];
};

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

type Props = Omit<RACButtonProps, 'className' | 'children' | ConflictingHandlers> &
  ButtonStyleProps & {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    children?: ReactNode;
    className?: string;
  };

export const Button: FC<Props> = ({
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
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <MotionRACButton
        {...motionPress}
        {...props}
        className={composeRenderProps(className, (extra, renderProps) =>
          buttonStyles({ ...renderProps, variant, color, size, shape, fullWidth, className: extra })
        )}
      >
        {startIcon ? <span aria-hidden="true">{startIcon}</span> : null}
        {children ? <span>{children}</span> : null}
        {endIcon ? <span aria-hidden="true">{endIcon}</span> : null}
      </MotionRACButton>
    </MotionConfig>
  </LazyMotion>
);

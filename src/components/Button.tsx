import type { FC, ReactNode } from 'react';
import { composeRenderProps, Button as RACButton, type ButtonProps as RACButtonProps } from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';
import { focusRing } from '~/utils/focusRing';

export const buttonStyles = tv({
  extend: focusRing,
  base: [
    'inline-flex items-center justify-center gap-2 cursor-pointer',
    'font-semibold tracking-tight select-none',
    'transition-[background-color,color,box-shadow,border-color,transform] duration-[var(--motion-duration-state)] ease-[var(--motion-ease-settle)]'
  ],
  variants: {
    variant: {
      solid: 'text-overlay-fg shadow-sm',
      outline: 'border-2 bg-transparent',
      ghost: 'border-2 border-transparent',
      card: 'group card text-fg rounded-2xl'
    },
    color: {
      brand: '',
      neutral: '',
      overlay: ''
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
    press: {
      none: '',
      subtle: '',
      bouncy: ''
    },
    fullWidth: {
      true: 'w-full'
    },
    isDisabled: {
      true: 'cursor-not-allowed opacity-60'
    },
    isHovered: {
      true: ''
    },
    isPressed: {
      true: ''
    }
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'brand',
      class: 'bg-accent-strong'
    },
    {
      variant: 'solid',
      color: 'brand',
      isHovered: true,
      class: 'bg-accent'
    },
    {
      variant: 'solid',
      color: 'brand',
      isPressed: true,
      class: 'bg-accent-strong'
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: 'bg-ink-950 text-ink-100'
    },
    {
      variant: 'solid',
      color: 'neutral',
      isHovered: true,
      class: 'bg-ink-800'
    },
    {
      variant: 'outline',
      color: 'brand',
      class: 'text-accent border-accent'
    },
    {
      variant: 'outline',
      color: 'brand',
      isHovered: true,
      class: 'bg-accent/10'
    },
    {
      variant: 'outline',
      color: 'neutral',
      class: 'text-fg border-border-subtle'
    },
    {
      variant: 'outline',
      color: 'neutral',
      isHovered: true,
      class: 'bg-surface-alt'
    },
    {
      variant: 'ghost',
      color: 'brand',
      class: 'text-accent'
    },
    {
      variant: 'ghost',
      color: 'brand',
      isHovered: true,
      class: 'bg-accent/10'
    },
    {
      variant: 'ghost',
      color: 'neutral',
      class: 'text-fg'
    },
    {
      variant: 'ghost',
      color: 'neutral',
      isHovered: true,
      class: 'bg-surface-alt'
    },
    {
      variant: 'ghost',
      color: 'overlay',
      class: 'border-overlay-border bg-overlay-control-bg text-overlay-fg border'
    },
    {
      variant: 'ghost',
      color: 'overlay',
      isHovered: true,
      class: 'bg-overlay-control-bg-hover'
    },
    {
      variant: 'card',
      isHovered: true,
      class: 'opacity-100'
    },
    { press: 'subtle', variant: 'card', class: 'card-hover-subtle' },
    { press: 'bouncy', variant: 'card', class: 'card-hover-bouncy' },
    {
      press: 'subtle',
      variant: ['solid', 'outline', 'ghost'],
      isHovered: true,
      class: '-translate-y-px scale-[1.01] motion-reduce:translate-y-0 motion-reduce:scale-100'
    },
    {
      press: 'subtle',
      variant: ['solid', 'outline', 'ghost'],
      isPressed: true,
      class: 'translate-y-0 scale-[0.99] motion-reduce:scale-100'
    },
    {
      press: 'bouncy',
      variant: ['solid', 'outline', 'ghost'],
      isHovered: true,
      class: '-translate-y-0.5 scale-[1.02] motion-reduce:translate-y-0 motion-reduce:scale-100'
    },
    {
      press: 'bouncy',
      variant: ['solid', 'outline', 'ghost'],
      isPressed: true,
      class: 'translate-y-0 scale-[0.98] motion-reduce:scale-100'
    },
    { shape: 'icon', size: 'sm', class: 'size-9 min-h-0' },
    { shape: 'icon', size: 'md', class: 'size-11 min-h-0' },
    { shape: 'icon', size: 'lg', class: 'size-14 min-h-0' },
    { shape: 'pill', class: 'rounded-full' },
    { shape: 'pill', size: 'sm', class: 'rounded-full' },
    { shape: 'pill', size: 'md', class: 'rounded-full' },
    { shape: 'pill', size: 'lg', class: 'rounded-full' },
    { variant: 'card', class: 'rounded-2xl' },
    { variant: 'card', shape: 'pill', class: 'rounded-full' }
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'brand',
    size: 'md',
    shape: 'default',
    press: 'subtle'
  }
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

export type ButtonStyleProps = {
  variant?: ButtonVariants['variant'];
  color?: ButtonVariants['color'];
  size?: ButtonVariants['size'];
  shape?: ButtonVariants['shape'];
  press?: ButtonVariants['press'];
  fullWidth?: ButtonVariants['fullWidth'];
};

type Props = Omit<RACButtonProps, 'className' | 'children'> &
  ButtonStyleProps & {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    children?: ReactNode;
    className?: RACButtonProps['className'];
  };

export const Button: FC<Props> = ({
  variant,
  color,
  size,
  shape,
  press,
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
      buttonStyles({ ...renderProps, variant, color, size, shape, press, fullWidth, className: extra })
    )}
  >
    {startIcon ? <span aria-hidden="true">{startIcon}</span> : null}
    {children}
  </RACButton>
);

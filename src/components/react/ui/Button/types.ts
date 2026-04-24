import type { VariantProps } from 'tailwind-variants';

import type { buttonStyles } from './Button';

type ButtonVariants = VariantProps<typeof buttonStyles>;

export type ButtonStyleProps = {
  variant?: ButtonVariants['variant'];
  color?: ButtonVariants['color'];
  size?: ButtonVariants['size'];
  shape?: ButtonVariants['shape'];
  fullWidth?: ButtonVariants['fullWidth'];
};

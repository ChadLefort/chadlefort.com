import type { FC, ReactNode } from 'react';
import { Button as RACButton, composeRenderProps, type ButtonProps } from 'react-aria-components';
import { buttonStyles, type ButtonStyleProps } from '~/utils/styles';

type ButtonVariants = NonNullable<ButtonStyleProps>;

type Props = Omit<ButtonProps, 'className' | 'children'> & {
  label: string;
  icon: ReactNode;
  variant?: ButtonVariants['variant'];
  color?: ButtonVariants['color'];
  size?: ButtonVariants['size'];
  className?: string;
};

export const IconButton: FC<Props> = ({
  label,
  icon,
  variant = 'ghost',
  color = 'neutral',
  size = 'md',
  className,
  ...props
}) => (
  <RACButton
    {...props}
    aria-label={label}
    className={composeRenderProps(className, (extra, renderProps) =>
      buttonStyles({ ...renderProps, variant, color, size, shape: 'icon', className: extra })
    )}
  >
    <span aria-hidden="true">{icon}</span>
  </RACButton>
);

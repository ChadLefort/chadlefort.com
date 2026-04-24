import type { FC } from 'react';
import { ChevronRight } from 'lucide-react';
import { tv } from 'tailwind-variants';

import type { SepProps } from './types';

const sepStyles = tv({
  base: 'text-term-sep h-3.5 w-3.5 shrink-0',
  variants: {
    hideOnMobile: {
      true: 'hidden md:inline-block'
    }
  }
});

export const Sep: FC<SepProps> = ({ hideOnMobile }) => (
  <ChevronRight className={sepStyles({ hideOnMobile })} aria-hidden="true" />
);

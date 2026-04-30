import { ChevronRight } from 'lucide-react';
import type { FC } from 'react';
import { tv } from 'tailwind-variants';

const sepStyles = tv({
  base: 'text-term-sep h-3.5 w-3.5 shrink-0',
  variants: {
    hideOnMobile: {
      true: 'hidden md:inline-block'
    }
  }
});

type SepProps = { hideOnMobile?: boolean };

export const Sep: FC<SepProps> = ({ hideOnMobile }) => (
  <ChevronRight className={sepStyles({ hideOnMobile })} aria-hidden="true" />
);

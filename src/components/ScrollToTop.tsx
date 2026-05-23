import { ArrowUp } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { IconButton } from '~/components/IconButton';
import { useReducedMotion } from '~/hooks/useReducedMotion';
import { cn } from '~/utils/cn';

export const ScrollToTop: FC = () => {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    let isVisible = window.scrollY > 400;

    const onScroll = () => {
      const nextVisible = window.scrollY > 400;

      if (nextVisible === isVisible) return;

      isVisible = nextVisible;
      setVisible(nextVisible);
    };

    setVisible(isVisible);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div
      data-no-print
      className={cn(
        'fixed right-6 bottom-6 z-30 transition-[opacity,transform] duration-[var(--motion-duration-state)] ease-[var(--motion-ease-settle)]',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      <IconButton
        onPress={scrollUp}
        label="Scroll to top"
        icon={<ArrowUp className="size-5" />}
        variant="solid"
        color="brand"
        size="lg"
      />
    </div>
  );
};

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { IconButton } from './ui/IconButton';
import { cn } from '~/utils/cn';

export const ScrollToTop: FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div
      data-no-print
      className={cn(
        'fixed right-6 bottom-6 z-30 transition-all duration-200',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      <IconButton
        onPress={scrollUp}
        label="Scroll to top"
        icon={<ArrowUp className="h-5 w-5" />}
        variant="solid"
        color="brand"
        size="lg"
      />
    </div>
  );
};

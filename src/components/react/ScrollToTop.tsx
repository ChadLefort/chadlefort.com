import { ArrowUp } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { IconButton } from '~/components/react/ui/IconButton/IconButton';
import { useReducedMotion } from '~/hooks/useReducedMotion';
import { cn } from '~/utils/cn';

export const ScrollToTop: FC = () => {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
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

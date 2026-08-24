import { useCallback, useSyncExternalStore } from 'react';

const getServerSnapshot = () => false;

export const useMediaQuery = (query: string) => {
  // Stable identity so useSyncExternalStore doesn't resubscribe every render
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);

      mql.addEventListener('change', onChange);

      return () => mql.removeEventListener('change', onChange);
    },
    [query]
  );

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

const baseMatchMedia = window.matchMedia;

export const createMatchMedia = (reducedMotion: boolean) => (query: string) => ({
  matches: reducedMotion && query === '(prefers-reduced-motion: reduce)',
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false
});

export const restoreMatchMedia = () => {
  window.matchMedia = baseMatchMedia;
};

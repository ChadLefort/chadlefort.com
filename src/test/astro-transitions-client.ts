// Test stub for `astro:transitions/client`. Replaces the virtual module so
// React components that import navigate() can render in jsdom without the
// Astro toolchain.
export const navigate = async (url: string): Promise<void> => {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
};

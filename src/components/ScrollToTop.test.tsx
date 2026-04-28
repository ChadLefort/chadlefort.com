import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ScrollToTop } from '~/components/ScrollToTop';
import { createMatchMedia, restoreMatchMedia } from '~/test/matchMedia';

const setScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    writable: true,
    value
  });
};

describe('ScrollToTop', () => {
  beforeEach(() => {
    setScrollY(0);
  });

  afterEach(() => {
    restoreMatchMedia();
  });

  it('stays hidden until the page has been scrolled', () => {
    const { container } = render(<ScrollToTop />);

    const wrapper = container.querySelector('[data-no-print]');

    expect(wrapper).toHaveClass('opacity-0');
    expect(wrapper).toHaveClass('pointer-events-none');

    act(() => {
      setScrollY(500);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(wrapper).toHaveClass('opacity-100');
    expect(wrapper).not.toHaveClass('pointer-events-none');
  });

  it('scrolls smoothly by default and respects reduced motion', async () => {
    const user = userEvent.setup();
    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;

    render(<ScrollToTop />);

    act(() => {
      setScrollY(500);
      window.dispatchEvent(new Event('scroll'));
    });

    await user.click(screen.getByRole('button', { name: /scroll to top/i }));
    expect(scrollToSpy).toHaveBeenLastCalledWith({ top: 0, behavior: 'smooth' });

    window.matchMedia = createMatchMedia(true);
    scrollToSpy.mockClear();

    render(<ScrollToTop />);

    act(() => {
      setScrollY(500);
      window.dispatchEvent(new Event('scroll'));
    });

    await user.click(screen.getAllByRole('button', { name: /scroll to top/i })[1]);
    expect(scrollToSpy).toHaveBeenLastCalledWith({ top: 0, behavior: 'auto' });
  });
});

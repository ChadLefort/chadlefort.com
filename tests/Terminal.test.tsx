import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Terminal } from '~/components/react/Terminal';
import {
  $closed,
  $maximized,
  $minimized,
  WELCOME_LINES,
  appendLines,
  resetShellStore,
  setInteractive
} from '~/components/react/Terminal/store';

const baseMatchMedia = window.matchMedia;

const createMatchMedia = (reducedMotion: boolean) => (query: string) => ({
  matches: reducedMotion && query === '(prefers-reduced-motion: reduce)',
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false
});

const renderTerminal = async () => {
  const rendered = render(<Terminal />);

  await screen.findByText('clefort');

  return rendered;
};

describe('Terminal', () => {
  beforeEach(() => {
    resetShellStore();
    window.matchMedia = createMatchMedia(true);
  });

  afterEach(() => {
    window.matchMedia = baseMatchMedia;
  });

  it('exposes a labelled region', async () => {
    await renderTerminal();

    expect(screen.getByLabelText('Terminal')).toBeInTheDocument();
  });

  it('renders the demo body by default', async () => {
    await renderTerminal();

    expect(screen.getAllByText('clefort').length).toBeGreaterThan(0);
  });

  it('switches to the interactive shell when unlocked', async () => {
    setInteractive(true);
    appendLines(WELCOME_LINES);
    render(<Terminal />);

    expect(await screen.findByText(/chadlefort\.com shell ready/i)).toBeInTheDocument();
  });

  it('minimize from maximized exits maximize', async () => {
    const user = userEvent.setup();

    await renderTerminal();
    await user.click(screen.getByRole('button', { name: /maximize terminal/i }));

    expect($maximized.get()).toBe(true);
    expect($minimized.get()).toBe(false);

    await user.click(screen.getByRole('button', { name: /minimize terminal/i }));

    expect($minimized.get()).toBe(true);
    expect($maximized.get()).toBe(false);
  });

  it('maximize while minimized un-minimizes', async () => {
    const user = userEvent.setup();

    await renderTerminal();
    await user.click(screen.getByRole('button', { name: /minimize terminal/i }));
    expect($minimized.get()).toBe(true);

    await user.click(screen.getByRole('button', { name: /maximize terminal/i }));

    expect($maximized.get()).toBe(true);
    expect($minimized.get()).toBe(false);
  });

  it('close while maximized exits maximize without closing', async () => {
    const user = userEvent.setup();

    await renderTerminal();
    await user.click(screen.getByRole('button', { name: /maximize terminal/i }));

    expect($maximized.get()).toBe(true);
    expect(document.documentElement.style.overflow).toBe('hidden');

    await user.click(screen.getByRole('button', { name: /close terminal/i }));

    expect($maximized.get()).toBe(false);
    expect($closed.get()).toBe(false);
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('has no axe violations', async () => {
    const { container } = await renderTerminal();

    expect(await axe(container)).toHaveNoViolations();
  });
});

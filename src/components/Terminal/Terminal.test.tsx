import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import {
  $closed,
  $maximized,
  $minimized,
  appendLines,
  resetShellStore,
  setInteractive,
  WELCOME_LINES
} from '~/components/Terminal/store';
import { Terminal } from '~/components/Terminal/Terminal';
import { createMatchMedia, restoreMatchMedia } from '~/test/matchMedia';

const renderTerminal = async () => {
  const rendered = render(<Terminal />);

  await screen.findByText('clefort');

  return rendered;
};

const renderUnlockedTerminal = () => {
  setInteractive(true);
  appendLines(WELCOME_LINES);

  return render(<Terminal />);
};

const maximizeTerminal = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: /maximize terminal/i }));
};

const expectMaximizedState = () => {
  expect($maximized.get()).toBe(true);
  expect($minimized.get()).toBe(false);
};

describe('Terminal', () => {
  beforeEach(() => {
    resetShellStore();
    window.matchMedia = createMatchMedia(true);
  });

  afterEach(() => {
    restoreMatchMedia();
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
    renderUnlockedTerminal();

    expect(await screen.findByText(/chadlefort\.com shell ready/i)).toBeInTheDocument();
  });

  it('minimize from maximized exits maximize', async () => {
    const user = userEvent.setup();

    await renderTerminal();
    await maximizeTerminal(user);

    expectMaximizedState();

    await user.click(screen.getByRole('button', { name: /minimize terminal/i }));

    expect($minimized.get()).toBe(true);
    expect($maximized.get()).toBe(false);
  });

  it('maximize while minimized un-minimizes', async () => {
    const user = userEvent.setup();

    await renderTerminal();
    await user.click(screen.getByRole('button', { name: /minimize terminal/i }));
    expect($minimized.get()).toBe(true);

    await maximizeTerminal(user);

    expectMaximizedState();
  });

  it('close while maximized exits maximize without closing', async () => {
    const user = userEvent.setup();

    await renderTerminal();
    await maximizeTerminal(user);

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

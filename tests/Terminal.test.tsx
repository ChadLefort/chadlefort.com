import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { beforeEach, describe, expect, it } from 'vitest';
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

describe('Terminal', () => {
  beforeEach(() => {
    resetShellStore();
  });

  it('exposes a labelled region', () => {
    render(<Terminal />);

    expect(screen.getByLabelText('Terminal')).toBeInTheDocument();
  });

  it('renders the demo body by default', () => {
    render(<Terminal />);

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

    render(<Terminal />);
    await user.click(screen.getByRole('button', { name: /maximize terminal/i }));

    expect($maximized.get()).toBe(true);
    expect($minimized.get()).toBe(false);

    await user.click(screen.getByRole('button', { name: /minimize terminal/i }));

    expect($minimized.get()).toBe(true);
    expect($maximized.get()).toBe(false);
  });

  it('maximize while minimized un-minimizes', async () => {
    const user = userEvent.setup();

    render(<Terminal />);
    await user.click(screen.getByRole('button', { name: /minimize terminal/i }));
    expect($minimized.get()).toBe(true);

    await user.click(screen.getByRole('button', { name: /maximize terminal/i }));

    expect($maximized.get()).toBe(true);
    expect($minimized.get()).toBe(false);
  });

  it('close while maximized exits maximize without closing', async () => {
    const user = userEvent.setup();

    render(<Terminal />);
    await user.click(screen.getByRole('button', { name: /maximize terminal/i }));

    expect($maximized.get()).toBe(true);
    expect(document.body.style.position).toBe('fixed');
    expect(document.documentElement.style.overflow).toBe('hidden');

    await user.click(screen.getByRole('button', { name: /close terminal/i }));

    expect($maximized.get()).toBe(false);
    expect($closed.get()).toBe(false);
    expect(document.body.style.position).toBe('');
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Terminal />);

    expect(await axe(container)).toHaveNoViolations();
  });
});

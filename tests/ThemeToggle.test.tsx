import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { ThemeToggle } from '~/components/react/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.add('dark');
  });

  it('renders a labeled button reflecting current theme', async () => {
    render(<ThemeToggle />);
    const button = await screen.findByRole('button', { name: /turn on light mode/i });

    expect(button).toBeInTheDocument();
  });

  it('toggles the theme + persists preference on click', async () => {
    const user = userEvent.setup();

    render(<ThemeToggle />);
    const button = await screen.findByRole('button');

    await user.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');

    await user.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('has no axe violations', async () => {
    const { container } = render(<ThemeToggle />);

    expect(await axe(container)).toHaveNoViolations();
  });
});

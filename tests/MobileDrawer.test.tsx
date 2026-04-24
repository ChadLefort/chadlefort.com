import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { MobileDrawer } from '~/components/react/MobileDrawer';
import { homeNav } from '~/data/nav';

describe('MobileDrawer', () => {
  it('opens drawer with primary links', async () => {
    const user = userEvent.setup();

    render(<MobileDrawer links={homeNav} />);

    await user.click(screen.getByRole('button', { name: /open navigation menu/i }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    homeNav.forEach((link) => {
      expect(screen.getByRole('link', { name: link.label })).toBeInTheDocument();
    });
  });

  it('closes via escape', async () => {
    const user = userEvent.setup();

    render(<MobileDrawer links={homeNav} />);

    await user.click(screen.getByRole('button', { name: /open navigation menu/i }));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has no axe violations when open', async () => {
    const user = userEvent.setup();

    const { container } = render(<MobileDrawer links={homeNav} />);

    await user.click(screen.getByRole('button', { name: /open navigation menu/i }));

    expect(await axe(container)).toHaveNoViolations();
  });
});

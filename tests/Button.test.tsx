import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Button } from '~/components/react/ui/Button/Button';
import { IconButton } from '~/components/react/ui/IconButton/IconButton';

describe('Button', () => {
  it('triggers onPress when clicked', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();

    render(<Button onPress={onPress}>Click me</Button>);

    await user.click(screen.getByRole('button', { name: /click me/i }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders disabled state with proper aria', () => {
    render(<Button isDisabled>Disabled</Button>);

    expect(screen.getByRole('button', { name: /disabled/i })).toHaveAttribute('data-disabled');
  });

  it('has no axe violations across variants', async () => {
    const { container } = render(
      <div>
        <Button variant="solid" color="brand">
          Solid
        </Button>
        <Button variant="outline" color="neutral">
          Outline
        </Button>
        <Button variant="ghost" color="brand">
          Ghost
        </Button>
      </div>
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('IconButton', () => {
  it('requires a label and exposes it via aria-label', () => {
    render(<IconButton label="Close" icon={<svg aria-hidden="true" />} />);

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});

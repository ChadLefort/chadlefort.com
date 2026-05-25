import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';

const focusRingClasses = [
  'focus-visible:outline-focus-ring',
  'focus-visible:outline-offset-[3px]',
  'focus-visible:outline-solid'
] as const;

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

  it.each([
    [
      'solid brand',
      <Button key="solid" variant="solid" color="brand">
        Primary
      </Button>,
      /primary/i
    ],
    ['card', <Button key="card">Copy email</Button>, /copy email/i]
  ])('applies shared focusRing styles on %s buttons', async (_label, ui, name) => {
    const user = userEvent.setup();

    render(ui);

    const button = screen.getByRole('button', { name });

    for (const className of focusRingClasses) {
      expect(button).toHaveClass(className);
    }

    await user.tab();
    expect(button).toHaveFocus();
  });
});

describe('IconButton', () => {
  it('requires a label and exposes it via aria-label', () => {
    render(<IconButton label="Close" icon={<svg aria-hidden="true" />} />);

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});

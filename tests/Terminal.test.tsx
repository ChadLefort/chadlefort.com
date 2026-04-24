import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { Terminal } from '~/components/react/Terminal';

describe('Terminal', () => {
  it('renders the prompt fully when reduced motion is preferred', () => {
    render(<Terminal prefersReducedMotion />);

    expect(screen.getByText('cat about.md')).toBeInTheDocument();
    expect(screen.getByText(/senior frontend engineer from Mandeville/i)).toBeInTheDocument();
  });

  it('exposes a labelled region', () => {
    render(<Terminal prefersReducedMotion />);

    expect(screen.getByLabelText('Terminal introduction')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Terminal prefersReducedMotion />);

    expect(await axe(container)).toHaveNoViolations();
  });
});

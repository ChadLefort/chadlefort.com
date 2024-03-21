import React from 'react';
import { Header } from '../home/Header';
import { render, screen } from '@testing-library/react';
import { vitest } from 'vitest';

describe('Header', () => {
  test('Shows the download button', () => {
    console.error = vitest.fn();
    render(<Header />);

    expect(screen.getByRole('link')).toHaveTextContent('Download Resume');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/Chad Lefort - Resume.pdf');
  });
});

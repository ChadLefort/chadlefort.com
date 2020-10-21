import React from 'react';
import { Header } from '../Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  test('Shows the 3 panels', () => {
    render(<Header />);

    expect(screen.getByText('Passionate')).toBeVisible();
    expect(screen.getByText('Always Learning')).toBeVisible();
    expect(screen.getByText('Motivated')).toBeVisible();
  });

  test('Shows the download button', () => {
    render(<Header />);

    expect(screen.getByRole('link')).toHaveTextContent('Download Resume');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/Chad Lefort - Resume.pdf');
  });
});

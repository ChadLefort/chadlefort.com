import React from 'react';
import { Header } from '../Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  test('Has an image of me', () => {
    render(<Header />);

    expect(screen.getByAltText('Chad Lefort')).toBeVisible();
  });

  test('Shows the 3 panels', () => {
    render(<Header />);

    expect(screen.getByText('Passionate')).toBeVisible();
    expect(screen.getByText('Always Learning')).toBeVisible();
    expect(screen.getByText('Motivated')).toBeVisible();
  });

  test('Shows the download button', () => {
    render(<Header />);

    expect(screen.getByRole('link')).toHaveTextContent('Download Résumé');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/Chad Lefort - Résumé.pdf');
  });
});

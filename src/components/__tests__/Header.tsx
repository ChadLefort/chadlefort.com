import React from 'react';
import { Header } from '../Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  test('Shows the download button', () => {
    render(<Header />);

    expect(screen.getByRole('link')).toHaveTextContent('Download Resume');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/Chad Lefort - Resume.pdf');
  });
});

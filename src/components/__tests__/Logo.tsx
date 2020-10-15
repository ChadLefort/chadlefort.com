import React from 'react';
import { Logo } from '../Logo';
import { render, screen } from '@testing-library/react';

describe('Logo', () => {
  test('Displays my name', () => {
    render(<Logo />);

    expect(screen.getByTitle('Angle Brackets')).toBeDefined();
    expect(screen.getByText('Chad Lefort')).toBeVisible();
  });
});

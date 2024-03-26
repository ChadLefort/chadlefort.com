import React from 'react';
import { render, screen } from '@testing-library/react';

import { Logo } from '../Logo';

describe('Logo', () => {
  test('Displays my name', () => {
    render(<Logo />);

    expect(screen.getByText('Chad Lefort')).toBeVisible();
  });
});

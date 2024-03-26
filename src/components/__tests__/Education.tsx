import React from 'react';
import { render, screen } from '@testing-library/react';

import { Education } from '../home/Education';

describe('Education', () => {
  test('Renders the section', () => {
    render(<Education />);

    expect(screen.getByText('Education')).toBeVisible();
  });
});

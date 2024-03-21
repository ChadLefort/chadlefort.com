import React from 'react';
import { Education } from '../home/Education';
import { render, screen } from '@testing-library/react';

describe('Education', () => {
  test('Renders the section', () => {
    render(<Education />);

    expect(screen.getByText('Education')).toBeVisible();
  });
});

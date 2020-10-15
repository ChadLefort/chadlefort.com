import React from 'react';
import { render, screen } from '@testing-library/react';
import { SiteTimeline } from '../Timeline';

describe('Job Experience', () => {
  test('Renders the section', () => {
    render(<SiteTimeline />);

    expect(screen.getByText('Job Experience')).toBeVisible();
    expect(screen.getByTestId('timeline')).toBeVisible();
  });
});

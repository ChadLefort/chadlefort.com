import React from 'react';
import { JobExperience } from '../JobExperience';
import { render, screen } from '@testing-library/react';

describe('Job Experience', () => {
  test('Renders the section', () => {
    render(<JobExperience />);

    expect(screen.getByText('Job Experience')).toBeVisible();
    expect(screen.getByTestId('timeline')).toBeVisible();
  });
});

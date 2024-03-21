import React from 'react';
import { JobExperience } from '../home/JobExperience';
import { render, screen } from '@testing-library/react';

describe('Job Experience', () => {
  test('Renders the section', () => {
    render(<JobExperience />);

    expect(screen.getByText('Job Experience')).toBeVisible();
    expect(screen.getByTestId('timeline')).toBeVisible();
  });
});

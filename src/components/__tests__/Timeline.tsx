import React from 'react';
import { render, screen } from '@testing-library/react';

import { JobExperience } from '../home/JobExperience';

describe('Job Experience', () => {
  test('Renders the section', () => {
    render(<JobExperience />);

    expect(screen.getByText('Job Experience')).toBeVisible();
    expect(screen.getByTestId('timeline')).toBeVisible();
  });
});

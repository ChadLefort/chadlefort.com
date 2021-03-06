import React from 'react';
import { AboutMe } from '../AboutMe';
import { render, screen } from '@testing-library/react';

describe('About Me', () => {
  test('Renders the section', () => {
    render(<AboutMe />);

    expect(screen.getByText('About Me')).toBeVisible();
  });
});

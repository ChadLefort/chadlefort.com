import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skills } from '../Skills';

describe('Skills', () => {
  test('Renders the section', () => {
    render(<Skills />);

    expect(screen.getByText('Skills')).toBeVisible();
  });

  test('Has all my skills', () => {
    render(<Skills />);

    expect(screen.getByTitle('React')).toBeDefined();
    expect(screen.getByTitle('Redux')).toBeDefined();
    expect(screen.getByTitle('Vue')).toBeDefined();
    expect(screen.getByTitle('TypeScript')).toBeDefined();
    expect(screen.getByTitle('Material-UI')).toBeDefined();
    expect(screen.getByTitle('Node JS')).toBeDefined();
    expect(screen.getByTitle('Webpack')).toBeDefined();
  });
});

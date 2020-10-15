import React from 'react';
import { Contact } from '../Contact';
import { render, screen } from '@testing-library/react';

describe('Contact', () => {
  test('Renders the section', () => {
    render(<Contact />);

    expect(screen.getByText('Contact')).toBeVisible();
  });

  test('Shows the contact buttons', () => {
    render(<Contact />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveTextContent('Email');
    expect(links[0]).toHaveAttribute('href', 'mailto:chadlefort@gmail.com');
    expect(links[1]).toHaveTextContent('Github');
    expect(links[1]).toHaveAttribute('href', 'https://github.com/ChadLefort');
    expect(links[2]).toHaveTextContent('Linkedin');
    expect(links[2]).toHaveAttribute('href', 'https://www.linkedin.com/in/chadlefort');
    expect(links[3]).toHaveTextContent('Twitter');
    expect(links[3]).toHaveAttribute('href', 'https://twitter.com/ChadLefort');
  });
});

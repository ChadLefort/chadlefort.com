import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { AboutMe } from '../home/AboutMe';

describe('About Me', () => {
  vi.mock('gatsby', async () => {
    const gatsby = await vi.importActual<typeof import('gatsby')>('gatsby');
    const mockUseStaticQuery = {
      allFile: {
        nodes: [
          {
            childImageSharp: {
              fluid: {
                aspectRatio: 1,
                src: '',
                srcSet: '',
                sizes: '',
                base64: '',
                tracedSVG: '',
                srcWebp: '',
                srcSetWebp: ''
              }
            }
          }
        ]
      }
    };

    return {
      ...gatsby,
      graphql: vi.fn(),
      useStaticQuery: vi.fn().mockImplementation(() => mockUseStaticQuery)
    };
  });

  test('Renders the section', () => {
    render(<AboutMe />);

    expect(screen.getByText('About Me')).toBeVisible();
  });
});

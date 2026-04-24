import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AboutMeSwiper } from '~/components/react/AboutMeSwiper';

const images = [
  { src: '/a.webp', alt: 'About 1' },
  { src: '/b.webp', alt: 'About 2' }
];

describe('AboutMeSwiper', () => {
  it('renders all images', () => {
    render(<AboutMeSwiper images={images} />);

    expect(screen.getAllByAltText(/About \d/)).toHaveLength(2);
  });
});

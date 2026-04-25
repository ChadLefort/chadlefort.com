import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AboutMeSwiper } from '~/components/react/AboutMeSwiper';

const images = [
  { src: '/a.webp', avif: '/a.avif 260w', webp: '/a.webp 260w', alt: 'About 1' },
  { src: '/b.webp', avif: '/b.avif 260w', webp: '/b.webp 260w', alt: 'About 2' }
];

describe('AboutMeSwiper', () => {
  it('renders all images', () => {
    render(<AboutMeSwiper images={images} />);

    expect(screen.getAllByAltText(/About \d/)).toHaveLength(2);
  });
});

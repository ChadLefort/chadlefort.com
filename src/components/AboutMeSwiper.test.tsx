import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AboutMeSwiper } from '~/components/AboutMeSwiper';

vi.mock('~/hooks/useReducedMotion', () => ({
  useReducedMotion: () => false
}));

const images = [
  { src: '/a.webp', avif: '/a.avif 260w', webp: '/a.webp 260w', alt: 'About 1' },
  { src: '/b.webp', avif: '/b.avif 260w', webp: '/b.webp 260w', alt: 'About 2' }
];

describe('AboutMeSwiper', () => {
  it('renders all images in a labeled carousel', () => {
    render(<AboutMeSwiper images={images} />);

    expect(screen.getByLabelText('Personal photo carousel')).toBeInTheDocument();
    expect(screen.getAllByAltText(/About \d/)).toHaveLength(2);
  });

  it('renders responsive picture sources', () => {
    render(<AboutMeSwiper images={images} />);

    const avifSources = document.querySelectorAll('source[type="image/avif"]');
    const webpSources = document.querySelectorAll('source[type="image/webp"]');

    expect(avifSources).toHaveLength(2);
    expect(webpSources).toHaveLength(2);
    expect(avifSources[0]).toHaveAttribute('sizes', '(min-width: 768px) 300px, 260px');
  });

  it('advances with ArrowRight keyboard navigation', async () => {
    render(<AboutMeSwiper images={images} />);

    const carousel = screen.getByLabelText('Personal photo carousel');

    await act(async () => {
      carousel.focus();
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    });

    expect(screen.getByText('Photo 2 of 2')).toBeInTheDocument();
  });

  it('marks slides with carousel slide semantics', () => {
    render(<AboutMeSwiper images={images} />);

    const carousel = screen.getByLabelText('Personal photo carousel');
    const slides = carousel.querySelectorAll('[aria-roledescription="slide"]');

    expect(slides).toHaveLength(2);
    expect(slides[0]).toHaveAttribute('aria-label', 'Photo 1 of 2');
  });
});

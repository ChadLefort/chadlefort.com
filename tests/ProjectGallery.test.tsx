import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { type GalleryImage, ProjectGallery } from '~/components/react/ProjectGallery';

const images: GalleryImage[] = [
  {
    src: '/desktop-1.webp',
    fullAvif: '/desktop-1.avif',
    thumbSrc: '/desktop-1-thumb.webp',
    thumbAvif: '/desktop-1-thumb.avif',
    thumbWebp: '/desktop-1-thumb.webp',
    thumbSizes: '50vw',
    alt: 'Desktop dashboard overview',
    orientation: 'landscape',
    width: 1600,
    height: 900
  },
  {
    src: '/desktop-2.webp',
    fullAvif: '/desktop-2.avif',
    thumbSrc: '/desktop-2-thumb.webp',
    thumbAvif: '/desktop-2-thumb.avif',
    thumbWebp: '/desktop-2-thumb.webp',
    thumbSizes: '50vw',
    alt: 'Desktop analytics panel',
    orientation: 'landscape',
    width: 1600,
    height: 900
  },
  {
    src: '/desktop-3.webp',
    fullAvif: '/desktop-3.avif',
    thumbSrc: '/desktop-3-thumb.webp',
    thumbAvif: '/desktop-3-thumb.avif',
    thumbWebp: '/desktop-3-thumb.webp',
    thumbSizes: '50vw',
    alt: 'Desktop contact panel',
    orientation: 'landscape',
    width: 1600,
    height: 900
  },
  {
    src: '/mobile-1.webp',
    fullAvif: '/mobile-1.avif',
    thumbSrc: '/mobile-1-thumb.webp',
    thumbAvif: '/mobile-1-thumb.avif',
    thumbWebp: '/mobile-1-thumb.webp',
    thumbSizes: '33vw',
    alt: 'Mobile course flow',
    orientation: 'portrait',
    width: 800,
    height: 1200
  }
];

describe('ProjectGallery', () => {
  it('renders desktop and mobile sections when both orientations are present', () => {
    render(<ProjectGallery images={images} title="Spear Dashboard" />);

    expect(screen.getByRole('heading', { name: 'Desktop', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mobile', level: 3 })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /open .* in lightbox/i })).toHaveLength(4);
  });

  it('eager-loads the first and second thumbnail in each gallery section', () => {
    render(<ProjectGallery images={images} title="Spear Dashboard" />);

    expect(screen.getByAltText('Desktop dashboard overview')).toHaveAttribute('loading', 'eager');
    expect(screen.getByAltText('Desktop analytics panel')).toHaveAttribute('loading', 'eager');
    expect(screen.getByAltText('Desktop contact panel')).toHaveAttribute('loading', 'lazy');
    expect(screen.getByAltText('Mobile course flow')).toHaveAttribute('loading', 'eager');
  });

  it('opens the lightbox and supports button + keyboard navigation', async () => {
    const user = userEvent.setup();

    render(<ProjectGallery images={images.slice(0, 2)} title="Spear Dashboard" />);

    await user.click(screen.getByRole('button', { name: /open desktop dashboard overview in lightbox/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /next image/i })[0]);
    expect(screen.getByText('2 / 2')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /close gallery/i })[0]);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders nothing when there are no images', () => {
    const { container } = render(<ProjectGallery images={[]} title="Empty gallery" />);

    expect(container).toBeEmptyDOMElement();
  });
});

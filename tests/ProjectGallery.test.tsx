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
    device: 'desktop',
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
    device: 'desktop',
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
    device: 'desktop',
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
    device: 'mobile',
    initialZoom: 10,
    orientation: 'portrait',
    width: 800,
    height: 1200
  }
];

describe('ProjectGallery', () => {
  it('renders desktop and mobile sections when both device groups are present', () => {
    render(<ProjectGallery images={images} title="Spear Dashboard" />);

    expect(screen.getByRole('heading', { name: 'Desktop', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mobile', level: 3 })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /open .* in lightbox/i })).toHaveLength(4);
  });

  it('groups images by explicit device instead of raw aspect ratio', () => {
    render(
      <ProjectGallery
        images={[
          {
            src: '/desktop-tall.webp',
            fullAvif: '/desktop-tall.avif',
            thumbSrc: '/desktop-tall-thumb.webp',
            thumbAvif: '/desktop-tall-thumb.avif',
            thumbWebp: '/desktop-tall-thumb.webp',
            thumbSizes: '50vw',
            alt: 'Tall desktop dashboard',
            device: 'desktop',
            orientation: 'portrait',
            width: 900,
            height: 1800
          },
          {
            src: '/mobile-tall.webp',
            fullAvif: '/mobile-tall.avif',
            thumbSrc: '/mobile-tall-thumb.webp',
            thumbAvif: '/mobile-tall-thumb.avif',
            thumbWebp: '/mobile-tall-thumb.webp',
            thumbSizes: '33vw',
            alt: 'Tall mobile dashboard',
            device: 'mobile',
            orientation: 'portrait',
            width: 900,
            height: 1800
          }
        ]}
        title="Spear Dashboard"
      />
    );

    const desktopSection = screen.getByRole('heading', { name: 'Desktop', level: 3 }).closest('section');
    const mobileSection = screen.getByRole('heading', { name: 'Mobile', level: 3 }).closest('section');

    expect(desktopSection).toContainElement(
      screen.getByRole('button', { name: /open tall desktop dashboard in lightbox/i })
    );
    expect(mobileSection).toContainElement(
      screen.getByRole('button', { name: /open tall mobile dashboard in lightbox/i })
    );
  });

  it('only eager-loads thumbnails in the first rendered gallery section', () => {
    render(<ProjectGallery images={images} title="Spear Dashboard" />);

    expect(screen.getByAltText('Desktop dashboard overview')).toHaveAttribute('loading', 'eager');
    expect(screen.getByAltText('Desktop analytics panel')).toHaveAttribute('loading', 'eager');
    expect(screen.getByAltText('Desktop contact panel')).toHaveAttribute('loading', 'lazy');
    expect(screen.getByAltText('Mobile course flow')).toHaveAttribute('loading', 'lazy');
  });

  it('eager-loads the first gallery section even when only mobile images exist', () => {
    render(<ProjectGallery images={images.slice(3)} title="Spear Dashboard" />);

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

  it('supports stepped zoom controls from buttons, keyboard, and image click', async () => {
    const user = userEvent.setup();

    render(<ProjectGallery images={images.slice(0, 1)} title="Spear Dashboard" />);

    await user.click(screen.getByRole('button', { name: /open desktop dashboard overview in lightbox/i }));

    expect(screen.getAllByText('100%')[0]).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /^zoom in$/i })[1]);
    expect(screen.getAllByText('125%')[0]).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'z' });
    expect(screen.getAllByText('150%')[0]).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Z', shiftKey: true });
    expect(screen.getAllByText('125%')[0]).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /reset image zoom/i }));
    expect(screen.getAllByText('100%')[0]).toBeInTheDocument();
  });

  it('respects per-image initial zoom when opening a tall mobile screenshot', async () => {
    const user = userEvent.setup();

    render(<ProjectGallery images={images.slice(3)} title="Spear Dashboard" />);

    await user.click(screen.getByRole('button', { name: /open mobile course flow in lightbox/i }));

    expect(screen.getAllByText('1000%')[0]).toBeInTheDocument();
  });

  it('renders nothing when there are no images', () => {
    const { container } = render(<ProjectGallery images={[]} title="Empty gallery" />);

    expect(container).toBeEmptyDOMElement();
  });
});

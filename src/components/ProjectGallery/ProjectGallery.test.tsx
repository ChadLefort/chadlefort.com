import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProjectGallery } from './ProjectGallery';
import type { GalleryImage } from './types';

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
    orientation: 'portrait',
    width: 800,
    height: 1200
  }
];

describe('ProjectGallery', () => {
  it('renders desktop and mobile sections when both device groups are present', () => {
    render(<ProjectGallery images={images} title="Spear Dashboard" />);

    expect(screen.getByRole('heading', { name: 'Desktop', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mobile', level: 2 })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /open screenshot:/i })).toHaveLength(4);
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

    const desktopSection = screen.getByRole('heading', { name: 'Desktop', level: 2 }).closest('section');
    const mobileSection = screen.getByRole('heading', { name: 'Mobile', level: 2 }).closest('section');

    expect(desktopSection).toContainElement(
      screen.getByRole('button', { name: /open screenshot: tall desktop dashboard/i })
    );
    expect(mobileSection).toContainElement(
      screen.getByRole('button', { name: /open screenshot: tall mobile dashboard/i })
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

    await user.click(screen.getByRole('button', { name: /open screenshot: desktop dashboard overview/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /next image/i })[0]);
    expect(screen.getByText('2 / 2')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /close screenshots/i })[0]);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('supports mobile swipe navigation inside the lightbox', async () => {
    const user = userEvent.setup();

    render(<ProjectGallery images={images.slice(0, 2)} title="Spear Dashboard" />);

    await user.click(screen.getByRole('button', { name: /open screenshot: desktop dashboard overview/i }));

    const imageToggle = screen.getByRole('button', { name: /zoom screenshot/i });

    fireEvent.touchStart(imageToggle, {
      touches: [{ clientX: 240, clientY: 120 }]
    });
    fireEvent.touchEnd(imageToggle, {
      changedTouches: [{ clientX: 120, clientY: 128 }],
      touches: []
    });

    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('supports stepped zoom controls from buttons, keyboard, and image click', async () => {
    const user = userEvent.setup();

    render(<ProjectGallery images={images.slice(0, 1)} title="Spear Dashboard" />);

    await user.click(screen.getByRole('button', { name: /open screenshot: desktop dashboard overview/i }));

    expect(screen.getAllByText('100%')[0]).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /^zoom in$/i })[0]);
    expect(screen.getAllByText('125%')[0]).toBeInTheDocument();

    const zoomToggle = screen.getByRole('button', { name: /reset screenshot zoom/i });
    expect(zoomToggle).toHaveAttribute('aria-pressed', 'true');
    expect(zoomToggle).toHaveAccessibleDescription(/screenshot zoom is 125%/i);

    fireEvent.keyDown(document, { key: 'z' });
    expect(screen.getAllByText('150%')[0]).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Z', shiftKey: true });
    expect(screen.getAllByText('125%')[0]).toBeInTheDocument();

    await user.click(zoomToggle);
    expect(screen.getAllByText('100%')[0]).toBeInTheDocument();
  });

  it('supports smooth zoom steps up to the desktop max zoom', async () => {
    const user = userEvent.setup();

    render(<ProjectGallery images={images.slice(0, 1)} title="Spear Dashboard" />);

    await user.click(screen.getByRole('button', { name: /open screenshot: desktop dashboard overview/i }));

    const desktopZoomInButton = screen.getAllByRole('button', { name: /^zoom in$/i })[0];

    for (let step = 0; step < 9; step += 1) {
      fireEvent.click(desktopZoomInButton);
    }

    expect(screen.getAllByText('400%')[0]).toBeInTheDocument();
    expect(desktopZoomInButton).toBeDisabled();
  });

  it('zooms to 200% on desktop and 800% on mobile when clicking the image', async () => {
    const user = userEvent.setup();

    render(<ProjectGallery images={images.slice(0, 1)} title="Spear Dashboard" />);
    await user.click(screen.getByRole('button', { name: /open screenshot: desktop dashboard overview/i }));
    await user.click(screen.getByRole('button', { name: /zoom screenshot/i }));
    expect(screen.getAllByText('200%')[0]).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /reset screenshot zoom/i }));
    await user.click(screen.getAllByRole('button', { name: /close screenshots/i })[0]);

    cleanup();

    render(<ProjectGallery images={images.slice(3)} title="Spear Dashboard" />);
    await user.click(screen.getByRole('button', { name: /open screenshot: mobile course flow/i }));
    await user.click(screen.getByRole('button', { name: /zoom screenshot/i }));
    expect(screen.getAllByText('800%')[0]).toBeInTheDocument();
  });

  it('steps through the mobile zoom ramp', async () => {
    const user = userEvent.setup();

    render(<ProjectGallery images={images.slice(3)} title="Spear Dashboard" />);

    await user.click(screen.getByRole('button', { name: /open screenshot: mobile course flow/i }));

    const zoomInButton = screen.getAllByRole('button', { name: /^zoom in$/i })[0];

    await user.click(zoomInButton);
    expect(screen.getAllByText('120%')[0]).toBeInTheDocument();

    await user.click(zoomInButton);
    expect(screen.getAllByText('140%')[0]).toBeInTheDocument();
  });

  it('opens mobile screenshots fit to the viewport at 100%', async () => {
    const user = userEvent.setup();

    render(<ProjectGallery images={images.slice(3)} title="Spear Dashboard" />);

    await user.click(screen.getByRole('button', { name: /open screenshot: mobile course flow/i }));

    expect(screen.getAllByText('100%')[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zoom screenshot/i })).toBeInTheDocument();
  });

  it('supports pinch zooming on mobile screenshots', async () => {
    const user = userEvent.setup();

    render(<ProjectGallery images={[{ ...images[3], initialZoom: 8 }]} title="Spear Dashboard" />);

    await user.click(screen.getByRole('button', { name: /open screenshot: mobile course flow/i }));

    const imageToggle = screen.getByRole('button', { name: /reset screenshot zoom/i });
    const image = imageToggle.querySelector('img') as HTMLImageElement;
    const viewport = imageToggle.closest('[aria-live="polite"]') as HTMLDivElement;

    Object.defineProperty(viewport, 'scrollWidth', { configurable: true, value: 800 });
    Object.defineProperty(viewport, 'clientWidth', { configurable: true, value: 390 });
    Object.defineProperty(viewport, 'scrollHeight', { configurable: true, value: 1200 });
    Object.defineProperty(viewport, 'clientHeight', { configurable: true, value: 700 });
    viewport.scrollLeft = 205;

    vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      width: 390,
      height: 700,
      top: 0,
      left: 0,
      right: 390,
      bottom: 700,
      toJSON: () => ({})
    });
    vi.spyOn(image, 'getBoundingClientRect').mockReturnValue({
      x: 12,
      y: 12,
      width: 800,
      height: 1200,
      top: 12,
      left: 12,
      right: 812,
      bottom: 1212,
      toJSON: () => ({})
    });

    fireEvent.touchStart(imageToggle, {
      touches: [
        { clientX: 100, clientY: 100 },
        { clientX: 200, clientY: 100 }
      ]
    });
    Object.defineProperty(viewport, 'scrollWidth', { configurable: true, value: 640 });
    fireEvent.touchMove(imageToggle, {
      touches: [
        { clientX: 135, clientY: 100 },
        { clientX: 165, clientY: 100 }
      ]
    });
    fireEvent.touchEnd(imageToggle, {
      changedTouches: [{ clientX: 135, clientY: 100 }],
      touches: []
    });

    expect(screen.queryByText('800%')).not.toBeInTheDocument();
    expect(viewport.scrollLeft).toBeGreaterThan(0);
  });

  it('renders nothing when there are no images', () => {
    const { container } = render(<ProjectGallery images={[]} title="Empty gallery" />);

    expect(container).toBeEmptyDOMElement();
  });
});

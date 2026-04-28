import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import type { GalleryImage } from '~/components/ProjectGallery';
import { ProjectTabsIsland } from '~/components/ProjectTabsIsland';

const galleryImages: GalleryImage[] = [
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
  }
];

describe('ProjectTabsIsland', () => {
  it('renders the description tab by default and omits images when no gallery exists', () => {
    render(
      <ProjectTabsIsland
        hasGallery={false}
        galleryImages={[]}
        title="Spear Dashboard"
        description={<p>Project summary</p>}
      />
    );

    expect(screen.getByRole('tab', { name: /description/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Project summary')).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: /images/i })).not.toBeInTheDocument();
  });

  it('switches to the gallery tab when images are available', async () => {
    const user = userEvent.setup();

    render(
      <ProjectTabsIsland
        hasGallery
        galleryImages={galleryImages}
        title="Spear Dashboard"
        description={<p>Project summary</p>}
      />
    );

    const imagesTab = screen.getByRole('tab', { name: /images/i });
    await user.click(imagesTab);

    expect(imagesTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('button', { name: /open desktop dashboard overview in lightbox/i })).toBeInTheDocument();
  });
});

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import type { GalleryImage } from '~/components/ProjectGallery';
import { PROJECT_GALLERY_OPEN_EVENT } from '~/components/ProjectGallery';
import { ProjectTabsIsland } from '~/components/ProjectTabsIsland';

const projectSkills = [
  { name: 'Vue', icon: 'devicon:vuejs' },
  { name: 'TypeScript', icon: 'devicon:typescript' }
];

const makeGalleryImage = (index: number, alt: string): GalleryImage => ({
  src: `/desktop-${index}.webp`,
  fullAvif: `/desktop-${index}.avif`,
  thumbSrc: `/desktop-${index}-thumb.webp`,
  thumbAvif: `/desktop-${index}-thumb.avif`,
  thumbWebp: `/desktop-${index}-thumb.webp`,
  thumbSizes: '50vw',
  alt,
  device: 'desktop',
  orientation: 'landscape',
  width: 1600,
  height: 900
});

const galleryImages: GalleryImage[] = [
  makeGalleryImage(1, 'Desktop dashboard overview'),
  makeGalleryImage(2, 'Desktop analytics panel')
];

describe('ProjectTabsIsland', () => {
  it('renders the description tab by default and omits images when no gallery exists', () => {
    render(
      <ProjectTabsIsland
        hasGallery={false}
        galleryImages={[]}
        projectSkills={projectSkills}
        title="Spear Dashboard"
        description={<p>Project summary</p>}
      />
    );

    expect(screen.getByRole('tab', { name: /description/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Project summary')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /skills/i })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: /images/i })).not.toBeInTheDocument();
  });

  it('switches to the gallery tab when images are available', async () => {
    const user = userEvent.setup();

    render(
      <ProjectTabsIsland
        hasGallery
        galleryImages={galleryImages}
        projectSkills={projectSkills}
        title="Spear Dashboard"
        description={<p>Project summary</p>}
      />
    );

    const imagesTab = screen.getByRole('tab', { name: /images/i });
    await user.click(imagesTab);

    expect(imagesTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('button', { name: /open desktop dashboard overview in lightbox/i })).toBeInTheDocument();
  });

  it('opens the lightbox when the hero requests the gallery and still allows navigation', async () => {
    const user = userEvent.setup();

    render(
      <ProjectTabsIsland
        hasGallery
        galleryImages={galleryImages}
        projectSkills={projectSkills}
        title="Spear Dashboard"
        description={<p>Project summary</p>}
      />
    );

    act(() => {
      window.dispatchEvent(new CustomEvent(PROJECT_GALLERY_OPEN_EVENT));
    });

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /images/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /next image/i })[0]);

    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });
});

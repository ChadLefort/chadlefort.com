import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PROJECT_GALLERY_OPEN_EVENT } from './constants';
import { ProjectHeroGalleryButton } from './ProjectHeroGalleryButton';

describe('ProjectHeroGalleryButton', () => {
  it('includes its visible text in its accessible name and opens the gallery', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    window.addEventListener(PROJECT_GALLERY_OPEN_EVENT, onOpen);

    try {
      render(
        <ProjectHeroGalleryButton>
          <img src="/project.webp" alt="Project preview" />
        </ProjectHeroGalleryButton>
      );

      const button = screen.getByRole('button', { name: 'View screenshots' });
      expect(button).toHaveTextContent('View screenshots');

      await user.click(button);
      expect(onOpen).toHaveBeenCalledOnce();
    } finally {
      window.removeEventListener(PROJECT_GALLERY_OPEN_EVENT, onOpen);
    }
  });

  it('supports a project-specific accessible label', () => {
    render(<ProjectHeroGalleryButton label="View screenshots of Dashboard">Preview</ProjectHeroGalleryButton>);

    expect(screen.getByRole('button', { name: 'View screenshots of Dashboard' })).toBeInTheDocument();
  });
});

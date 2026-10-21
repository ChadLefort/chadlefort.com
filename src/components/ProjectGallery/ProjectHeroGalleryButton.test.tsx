import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PROJECT_GALLERY_OPEN_EVENT } from './constants';
import { ProjectHeroGalleryButton } from './ProjectHeroGalleryButton';

describe('ProjectHeroGalleryButton', () => {
  it('includes the visible label in its accessible name and requests the gallery on press', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    window.addEventListener(PROJECT_GALLERY_OPEN_EVENT, onOpen);

    try {
      render(
        <ProjectHeroGalleryButton>
          <img src="/cover.webp" alt="Project overview" />
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
});

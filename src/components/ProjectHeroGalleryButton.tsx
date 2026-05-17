import { Images } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { Button } from '~/components/Button';
import { pillLinkStyles } from '~/components/PillLink';
import { PROJECT_GALLERY_OPEN_EVENT, thumbButton } from '~/components/ProjectGallery';

type Props = {
  label?: string;
  children: ReactNode;
};

export const ProjectHeroGalleryButton: FC<Props> = ({ label = 'Open project image gallery', children }) => (
  <Button
    aria-label={label}
    variant="unstyled"
    fullWidth
    onPress={() => {
      window.dispatchEvent(new CustomEvent(PROJECT_GALLERY_OPEN_EVENT));
    }}
    className={thumbButton()}
  >
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
      <div data-hero-cover-media className="h-full w-full transition duration-200 ease-out">
        {children}
      </div>
      <div
        data-hero-cover-overlay
        className="pointer-events-none absolute inset-0 bg-black/0 transition duration-200 ease-out"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end p-4">
        <span className={pillLinkStyles({ className: 'pointer-events-none shadow-lg shadow-black/15' })}>
          <Images className="size-4" aria-hidden="true" />
          View gallery
        </span>
      </div>
    </div>
  </Button>
);

import { Images } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { Button, buttonStyles } from '~/components/Button';
import { PROJECT_GALLERY_OPEN_EVENT } from '~/components/ProjectGallery';

type Props = {
  label?: string;
  children: ReactNode;
};

export const ProjectHeroGalleryButton: FC<Props> = ({ label = 'Open project screenshots', children }) => (
  <Button
    aria-label={label}
    variant="card"
    fullWidth
    onPress={() => {
      window.dispatchEvent(new CustomEvent(PROJECT_GALLERY_OPEN_EVENT));
    }}
    className="relative block overflow-hidden rounded-2xl p-0 transition duration-[var(--motion-duration-state)] ease-[var(--motion-ease-settle)]"
  >
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
      <div
        data-hero-cover-media
        className="size-full transition duration-[var(--motion-duration-state)] ease-[var(--motion-ease-out)]"
      >
        {children}
      </div>
      <div
        data-hero-cover-overlay
        className="pointer-events-none absolute inset-0 bg-transparent transition duration-[var(--motion-duration-state)] ease-[var(--motion-ease-out)]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end p-4">
        <span
          className={buttonStyles({
            variant: 'card',
            shape: 'pill',
            size: 'sm',
            className: 'pointer-events-none min-h-11 gap-1.5 px-4 py-2 shadow-sm'
          })}
        >
          <Images className="size-4" aria-hidden="true" />
          View screenshots
        </span>
      </div>
    </div>
  </Button>
);

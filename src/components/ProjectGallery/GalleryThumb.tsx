import type { FC } from 'react';
import { useState } from 'react';
import { Button } from '~/components/Button';
import { thumbFrame, thumbImg } from './styles';
import type { GalleryImage } from './types';

type Props = {
  image: GalleryImage;
  index: number;
  onOpen: () => void;
  eager?: boolean;
};

export const GalleryThumb: FC<Props> = ({ image, index, onOpen, eager = false }) => {
  const [loaded, setLoaded] = useState(false);
  const label = image.alt.trim() || 'Project screenshot';

  return (
    <Button
      variant="card"
      onPress={onOpen}
      data-gallery-index={index}
      className="relative block w-full overflow-hidden rounded-2xl p-0 transition duration-[var(--motion-duration-state)] ease-[var(--motion-ease-settle)]"
      aria-label={`Open screenshot: ${label}`}
    >
      <div className={thumbFrame({ device: image.device })} data-gallery-morph>
        {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-alt" aria-hidden="true" />}
        <picture>
          <source type="image/avif" srcSet={image.thumbAvif} sizes={image.thumbSizes} />
          <source type="image/webp" srcSet={image.thumbWebp} sizes={image.thumbSizes} />
          <img
            data-gallery-shot
            src={image.thumbSrc}
            alt={label}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={thumbImg({ loaded })}
          />
        </picture>
      </div>
    </Button>
  );
};

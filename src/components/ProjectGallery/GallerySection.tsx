import type { FC, ReactNode } from 'react';
import { GalleryThumb } from './GalleryThumb';
import type { IndexedImage } from './types';

type Props = {
  id: string;
  label: string;
  icon: ReactNode;
  gridClass: string;
  images: IndexedImage[];
  onOpen: (index: number) => void;
  wrapThumb?: boolean;
  eagerCount?: number;
};

export const GallerySection: FC<Props> = ({
  id,
  label,
  icon,
  gridClass,
  images,
  onOpen,
  wrapThumb,
  eagerCount = 0
}) => (
  <section aria-labelledby={id}>
    <h2
      id={id}
      className="text-fg-muted mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase md:mb-8"
    >
      {icon}
      {label}
    </h2>
    <div className={gridClass}>
      {images.map((image, index) =>
        wrapThumb ? (
          <div key={image.src} className="mx-auto w-full max-w-65">
            <GalleryThumb
              image={image}
              index={image.index}
              onOpen={() => onOpen(image.index)}
              eager={index < eagerCount}
            />
          </div>
        ) : (
          <div key={image.src}>
            <GalleryThumb
              image={image}
              index={image.index}
              onOpen={() => onOpen(image.index)}
              eager={index < eagerCount}
            />
          </div>
        )
      )}
    </div>
  </section>
);

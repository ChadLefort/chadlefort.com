import 'swiper/css';
import 'swiper/css/effect-cards';
import type { FC } from 'react';
import { Autoplay, EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Image = { src: string; alt: string };
type Props = { images: Image[] };

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const AboutMeSwiper: FC<Props> = ({ images }) => {
  const reduced = prefersReducedMotion();

  return (
    <div className="mx-auto w-full max-w-65">
      <Swiper
        slidesPerView={1}
        grabCursor
        effect="cards"
        autoplay={reduced ? false : { delay: 3200, disableOnInteraction: false }}
        modules={[Autoplay, EffectCards]}
        a11y={{ enabled: true }}
        className="overflow-visible"
      >
        {images.map((image) => (
          <SwiperSlide
            key={image.src}
            className="bg-surface-raised ring-glass-border overflow-hidden rounded-2xl ring-1"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

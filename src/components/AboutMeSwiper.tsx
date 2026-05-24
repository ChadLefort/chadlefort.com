import 'swiper/css';
import 'swiper/css/effect-cards';
import type { FC } from 'react';
import { useRef } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Autoplay, EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useReducedMotion } from '~/hooks/useReducedMotion';

type Image = { src: string; avif: string; webp: string; alt: string };
type Props = { images: Image[] };

const SIZES = '(min-width: 768px) 300px, 260px';

export const AboutMeSwiper: FC<Props> = ({ images }) => {
  const reduced = useReducedMotion();
  const canAutoplay = !reduced && images.length > 1;
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <div className="-my-4 w-full overflow-x-clip py-4">
      <div className="mx-auto w-full max-w-65">
        <Swiper
          slidesPerView={1}
          grabCursor
          effect="cards"
          autoplay={canAutoplay ? { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
          modules={[Autoplay, EffectCards]}
          a11y={{ enabled: true }}
          aria-label="Personal photo carousel"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onFocusCapture={() => swiperRef.current?.autoplay?.stop()}
          onBlurCapture={() => {
            if (canAutoplay) swiperRef.current?.autoplay?.start();
          }}
          className="overflow-visible"
        >
          {images.map((image) => (
            <SwiperSlide
              key={image.src}
              className="bg-surface-raised ring-panel-border overflow-hidden rounded-2xl ring-1"
            >
              <picture>
                <source type="image/avif" srcSet={image.avif} sizes={SIZES} />
                <source type="image/webp" srcSet={image.webp} sizes={SIZES} />
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

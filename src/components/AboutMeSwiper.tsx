import type { FC } from 'react';
import { tv } from 'tailwind-variants';
import { useAboutMeCarousel } from '~/hooks/useAboutMeCarousel';
import { useReducedMotion } from '~/hooks/useReducedMotion';
import { ABOUT_ME_IMAGE_SIZES, getCardsTransformStyle } from '~/utils/aboutMeCardsEffect';

type AboutMeImage = { src: string; avif: string; webp: string; alt: string };
type Props = { images: AboutMeImage[] };

const shell = tv({
  base: '-my-4 w-full overflow-visible py-4'
});

const focusGutter = tv({
  base: 'group/carousel overflow-visible rounded-2xl outline-none focus:outline-none focus-visible:outline-none'
});

const trackClip = tv({
  base: 'overflow-visible'
});

const track = tv({
  base: 'relative aspect-square cursor-grab touch-pan-y overflow-visible active:cursor-grabbing'
});

const slide = tv({
  base: [
    'absolute inset-0 origin-bottom overflow-hidden rounded-2xl border border-panel-border bg-term-bg',
    '[backface-visibility:hidden]',
    'transition-[transform,box-shadow] duration-[var(--motion-duration-state)] ease-[var(--motion-ease-out)] motion-reduce:transition-none'
  ],
  variants: {
    animate: {
      true: '',
      false: 'transition-none'
    },
    front: {
      true: [
        'group-focus-visible/carousel:ring-2 group-focus-visible/carousel:ring-focus-ring',
        'group-focus-visible/carousel:ring-offset-2 group-focus-visible/carousel:ring-offset-surface'
      ],
      false: ''
    }
  }
});

const slideShadow = tv({
  base: [
    'pointer-events-none absolute inset-0 bg-black/15',
    'transition-opacity duration-[var(--motion-duration-state)] ease-[var(--motion-ease-out)] motion-reduce:transition-none'
  ],
  variants: {
    animate: {
      true: '',
      false: 'transition-none'
    }
  }
});

type SlideProps = {
  image: AboutMeImage;
  slideIndex: number;
  activeIndex: number;
  slideCount: number;
  position: number;
  floorIndex: number;
  dragging: boolean;
  dragToNext: boolean;
  shouldAnimate: boolean;
};

const AboutMeSlide: FC<SlideProps> = ({
  image,
  slideIndex,
  activeIndex,
  slideCount,
  position,
  floorIndex,
  dragging,
  dragToNext,
  shouldAnimate
}) => {
  const progress = position - slideIndex;
  const style = getCardsTransformStyle(progress, slideCount, {
    dragging,
    dragToNext,
    slideIndex,
    floorIndex
  });

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`Photo ${slideIndex + 1} of ${slideCount}`}
      aria-hidden={slideIndex !== activeIndex}
      className={slide({ animate: shouldAnimate, front: slideIndex === activeIndex })}
      style={{ transform: style.transform, zIndex: style.zIndex }}
    >
      <picture>
        <source type="image/avif" srcSet={image.avif} sizes={ABOUT_ME_IMAGE_SIZES} />
        <source type="image/webp" srcSet={image.webp} sizes={ABOUT_ME_IMAGE_SIZES} />
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="size-full object-cover"
        />
      </picture>
      <div
        aria-hidden="true"
        className={slideShadow({ animate: shouldAnimate })}
        style={{ opacity: style.shadowOpacity }}
      />
    </div>
  );
};

export const AboutMeSwiper: FC<Props> = ({ images }) => {
  const reduced = useReducedMotion();
  const canAutoplay = !reduced && images.length > 1;

  const slideCount = images.length;
  const {
    trackRef,
    index,
    position,
    floorIndex,
    dragging,
    dragToNext,
    shouldAnimate,
    onPointerDown,
    onPointerMove,
    finishDrag,
    cancelDrag,
    setHoverPaused,
    setFocusStopped,
    onBlurCapture,
    onKeyDown
  } = useAboutMeCarousel(slideCount, canAutoplay);

  const activeIndex = Math.round(position);

  return (
    <div className={shell()}>
      <div className="mx-auto w-full max-w-65">
        {slideCount > 1 ? (
          <p className="sr-only" aria-live="polite">
            Photo {index + 1} of {slideCount}
          </p>
        ) : null}
        <div
          ref={trackRef}
          role="region"
          aria-label="Personal photo carousel"
          aria-roledescription="carousel"
          className={focusGutter()}
          tabIndex={slideCount > 1 ? 0 : undefined}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={cancelDrag}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onFocusCapture={() => setFocusStopped(true)}
          onBlurCapture={onBlurCapture}
        >
          <div className={trackClip()}>
            <div className={track()} style={{ perspective: '1200px' }}>
              {images.map((image, slideIndex) => (
                <AboutMeSlide
                  key={image.src}
                  image={image}
                  slideIndex={slideIndex}
                  activeIndex={activeIndex}
                  slideCount={images.length}
                  position={position}
                  floorIndex={floorIndex}
                  dragging={dragging}
                  dragToNext={dragToNext}
                  shouldAnimate={shouldAnimate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

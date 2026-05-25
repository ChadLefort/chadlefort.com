export const ABOUT_ME_IMAGE_SIZES = '(min-width: 768px) 300px, 260px';

const CARDS_EFFECT = {
  perSlideRotate: 2,
  perSlideOffset: 8,
  swipeFanRotate: 28,
  rotate: true
} as const;

export type CardsTransformOptions = {
  dragging: boolean;
  dragToNext: boolean;
  slideIndex: number;
  floorIndex: number;
};

export type CardsTransformStyle = {
  transform: string;
  zIndex: number;
  shadowOpacity: number;
};

const clampProgress = (progress: number) => Math.min(Math.max(progress, -4), 4);

const isForwardPartialSwipe = (clamped: number) => clamped > 0 && clamped < 1;

const isBackwardPartialSwipe = (clamped: number) => clamped < 0 && clamped > -1;

const isNextSwipeSlide = (slideIndex: number, floorIndex: number) =>
  slideIndex === floorIndex || slideIndex === floorIndex - 1;

const isPrevSwipeSlide = (slideIndex: number, floorIndex: number) =>
  slideIndex === floorIndex || slideIndex === floorIndex + 1;

const isSwipeFanGesture = (clamped: number, opts: CardsTransformOptions) => {
  if (!opts.dragging) return false;

  if (opts.dragToNext) {
    return isForwardPartialSwipe(clamped) && isNextSwipeSlide(opts.slideIndex, opts.floorIndex);
  }

  return isBackwardPartialSwipe(clamped) && isPrevSwipeSlide(opts.slideIndex, opts.floorIndex);
};

const getSwipeFanAdjustments = (clamped: number) => {
  const subProgress = (1 - Math.abs((Math.abs(clamped) - 0.5) / 0.5)) ** 0.5;

  return {
    rotateDelta: -CARDS_EFFECT.swipeFanRotate * clamped * subProgress,
    scaleDelta: -0.5 * subProgress,
    offsetDelta: 96 * subProgress,
    translateY: `${-25 * subProgress * Math.abs(clamped)}%`
  };
};

const getSlideTranslateX = (clamped: number, tXAdd: number) => {
  if (clamped < 0) return `calc(0px + (${tXAdd * Math.abs(clamped)}%))`;
  if (clamped > 0) return `calc(0px + (-${tXAdd * Math.abs(clamped)}%))`;
  return '0px';
};

const getScaleString = (clamped: number, scale: number) =>
  clamped < 0 ? `${1 + (1 - scale) * clamped}` : `${1 - (1 - scale) * clamped}`;

export const getCardsTransformStyle = (
  progress: number,
  slideCount: number,
  opts: CardsTransformOptions
): CardsTransformStyle => {
  const clamped = clampProgress(progress);
  let tY: string | number = 0;
  let scale = 1;
  let rotate = -CARDS_EFFECT.perSlideRotate * clamped;
  let tXAdd = CARDS_EFFECT.perSlideOffset - Math.abs(clamped) * 0.75;

  if (isSwipeFanGesture(clamped, opts)) {
    const fan = getSwipeFanAdjustments(clamped);
    rotate += fan.rotateDelta;
    scale += fan.scaleDelta;
    tXAdd += fan.offsetDelta;
    tY = fan.translateY;
  }

  const tX = getSlideTranslateX(clamped, tXAdd);
  const tZ = -100 * Math.abs(clamped);
  const scaleString = getScaleString(clamped, scale);

  return {
    transform: `translate3d(${tX}, ${tY}, ${tZ}px) rotateZ(${CARDS_EFFECT.rotate ? rotate : 0}deg) scale(${scaleString})`,
    zIndex: -Math.abs(Math.round(clamped)) + slideCount,
    shadowOpacity: Math.min(Math.max((Math.abs(clamped) - 0.5) / 0.5, 0), 1)
  };
};

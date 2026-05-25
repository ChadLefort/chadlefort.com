import type { CSSProperties, TouchEvent as ReactTouchEvent, RefObject } from 'react';
import type { BASE_ZOOM_LEVELS } from './constants';

export type GalleryImage = {
  src: string;
  fullAvif: string;
  thumbSrc: string;
  thumbAvif: string;
  thumbWebp: string;
  thumbSizes: string;
  alt: string;
  device: 'desktop' | 'mobile';
  initialZoom?: ZoomLevel;
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
};

export type IndexedImage = GalleryImage & { index: number };

export type ProjectGalleryProps = {
  images: GalleryImage[];
  title: string;
  openRequest?: number;
};

export type SwipeState = { x: number; y: number };
export type PinchState = { distance: number; zoomLevel: number };
export type PinchAnchor = { localX: number; localY: number; ratioX: number; ratioY: number };
export type TouchHandler = (event: ReactTouchEvent<HTMLButtonElement>) => void;
export type ZoomLevel = (typeof BASE_ZOOM_LEVELS)[number];

export type LightboxLayoutStyles = {
  frame?: CSSProperties;
  image: CSSProperties;
};

export type ProjectGalleryLightboxProps = {
  active: number;
  activeImage: GalleryImage;
  canZoomIn: boolean;
  canZoomOut: boolean;
  imagesLength: number;
  imageButtonRef: RefObject<HTMLButtonElement | null>;
  onImageClick: () => void;
  onImageLoad: () => void;
  onImageTouchCancel: () => void;
  onImageTouchEnd: TouchHandler;
  onImageTouchMove: TouchHandler;
  onImageTouchStart: TouchHandler;
  onNext: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onOutsideImageClick: () => void;
  onPrev: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  open: boolean;
  title: string;
  viewportRef: RefObject<HTMLDivElement | null>;
  zoomDescriptionId: string;
  zoomLabel: string;
  zoomed: boolean;
  lightboxLayoutStyles: LightboxLayoutStyles;
};

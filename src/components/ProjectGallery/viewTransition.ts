export const GALLERY_VIEW_TRANSITION = 'gallery-lightbox';

const thumbMorphSelector = (index: number) => `[data-gallery-index="${index}"] [data-gallery-morph]`;

export const primeGalleryThumbTransition = (index: number) => {
  document
    .querySelector<HTMLElement>(thumbMorphSelector(index))
    ?.style.setProperty('view-transition-name', GALLERY_VIEW_TRANSITION);
};

export const clearGalleryThumbTransition = (index: number) => {
  document.querySelector<HTMLElement>(thumbMorphSelector(index))?.style.removeProperty('view-transition-name');
};

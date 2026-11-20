import type { CSSProperties } from 'react';

export const nudgeModeStyles = {
  lightModeOnly: {
    '.pf-v6-theme-dark &': { display: 'none' },
  },
  darkModeOnly: {
    display: 'none',
    '.pf-v6-theme-dark &': { display: 'block' },
  },
};

export const partnerLogoStyles = {
  display: 'block',
  width: 'min(120px, 30vw)',
};

/**
 * Shared sizing for a rectangular brand image (e.g. a full wordmark logo), built from
 * caller-supplied size/offset values rather than hardcoded per asset.
 */
export const createImageSizeStyle = (size: string, offset?: string): CSSProperties => (
  offset === undefined ? { width: size } : { width: size, marginInlineStart: offset }
);

/**
 * Shared sizing for a square brand mark (icon-style logomark or title icon container).
 */
export const createSquareImageSizeStyle = (size: string, offset?: string): CSSProperties => ({
  ...createImageSizeStyle(size, offset),
  height: size,
});

/** Default background tint applied for `brand="lightwell"`; overridable via the `backgroundColor` prop. */
export const LIGHTWELL_BACKGROUND_COLOR = '#e5e0df';

export const lightwellCtaStyle = {
  '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
  '--pf-v6-c-button--hover--BackgroundColor': 'var(--pf-t--color--red--60)',
  '--pf-v6-c-button--m-clicked--BackgroundColor': 'var(--pf-t--color--red--60)',
  '--pf-v6-c-button--Color': 'var(--pf-t--color--white)'
} as CSSProperties;

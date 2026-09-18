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

export const lightwellBackgroundStyle = {
  '--lightwell--background-color': '#e5e0df',
};

export const lightwellCtaStyle = {
  '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
  '--pf-v6-c-button--hover--BackgroundColor': 'var(--pf-t--color--red--60)',
  '--pf-v6-c-button--m-clicked--BackgroundColor': 'var(--pf-t--color--red--60)',
} as CSSProperties;

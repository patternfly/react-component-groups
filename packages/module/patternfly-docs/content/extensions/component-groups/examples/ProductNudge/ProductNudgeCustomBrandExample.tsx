import React from 'react';
import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

// A consumer would point this at their own hosted logo asset; this example uses an inline
// SVG data URI so the demo has no external dependency.
const acmeLogo = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="32"><text x="0" y="24" font-family="sans-serif" font-size="24" font-weight="bold" fill="#6753ac">Acme</text></svg>',
)}`;

// No `brand` prop here — this demonstrates a fully custom, non-Lightwell nudge built
// entirely from caller-supplied text, images, colors, and sizing overrides.
export const ProductNudgeCustomBrandExample: React.FunctionComponent = () => (
  <ProductNudge
    prominence="hero"
    behavior="dismissible"
    isEligible
    onAction={() => alert('CTA clicked')}
    ctaColorScheme="custom"
    ctaStyle={{
      '--pf-v6-c-button--BackgroundColor': '#6753ac',
      '--pf-v6-c-button--hover--BackgroundColor': '#52408a',
      '--pf-v6-c-button--Color': '#ffffff',
    } as React.CSSProperties}
    backgroundColor="#eef1fd"
    logoSize="3rem"
    logoOffset="0"
    content={{
      id: 'example.custom-brand',
      headline: 'Unlock deeper insights with Acme Analytics',
      body: 'Acme Analytics connects your existing tools into a single, actionable dashboard.',
      cta: { label: 'Try it free', action: 'link', href: 'https://example.com' },
      assets: {
        logo: { src: acmeLogo, alt: 'Acme Analytics' },
      },
    }}
  />
);

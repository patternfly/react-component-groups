import React, { useState } from 'react';
import { Checkbox } from '@patternfly/react-core';
import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
// The Lightwell hero background images are ~2MB and are intentionally excluded from the
// default `ProductNudge` import graph so non-Lightwell consumers never pay for them. Hero
// nudges that want the Lightwell background opt in with this one extra import. See the
// "Bundle size" note on this page.
import { lightwellBackgroundAssets } from '@patternfly/react-component-groups/dist/esm/ProductNudge/productNudgeLightwellBackgrounds';

// A consumer would point this at their own hosted logo asset; this example uses an inline
// SVG data URI so the demo has no external dependency.
const brandLogo = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="32"><text x="0" y="24" font-family="sans-serif" font-size="24" font-weight="bold" fill="#151515">Brand</text></svg>',
)}`;

export const ProductNudgeHeroExample: React.FunctionComponent = () => {
  const [ useLightwell, setUseLightwell ] = useState(true);

  return (
    <>
      <Checkbox
        id="hero-use-lightwell"
        label="Use Lightwell branding"
        isChecked={useLightwell}
        onChange={(_event, checked) => setUseLightwell(checked)}
      />
      <ProductNudge
        prominence="hero"
        brand={useLightwell ? 'lightwell' : undefined}
        behavior="dismissible"
        isEligible
        onAction={() => alert('CTA clicked')}
        content={useLightwell ? {
          id: 'example.hero',
          headline: 'Accelerate open-source adoption with Lightwell',
          body: 'Lightwell maps your package catalog to the Red Hat ecosystem, so your teams can modernize faster with supported, enterprise-grade alternatives.',
          cta: { label: 'Get in touch', action: 'contact' },
          assets: lightwellBackgroundAssets,
        } : {
          id: 'example.hero',
          headline: 'Title text',
          body: 'Supporting body text for the nudge.',
          cta: { label: 'CTA text', action: 'link', href: 'https://example.com' },
          assets: {
            logo: { src: brandLogo, alt: 'Brand' },
          },
        }}
      />
    </>
  );
};

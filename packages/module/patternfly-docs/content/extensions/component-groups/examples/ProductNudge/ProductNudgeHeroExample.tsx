import React from 'react';
import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
// The Lightwell hero background images are ~2MB and are intentionally excluded from the
// default `ProductNudge` import graph so non-Lightwell consumers never pay for them. Hero
// nudges that want the Lightwell background opt in with this one extra import. See the
// "Bundle size" note on this page.
import { lightwellBackgroundAssets } from '@patternfly/react-component-groups/dist/esm/ProductNudge/productNudgeLightwellBackgrounds';

export const ProductNudgeHeroExample: React.FunctionComponent = () => (
  <ProductNudge
    prominence="hero"
    brand="lightwell"
    behavior="dismissible"
    isEligible
    onAction={() => alert('CTA clicked')}
    content={{
      id: 'example.hero',
      headline: 'Accelerate open-source adoption with Lightwell',
      body: 'Lightwell maps your package catalog to the Red Hat ecosystem, so your teams can modernize faster with supported, enterprise-grade alternatives.',
      cta: { label: 'Get in touch', action: 'contact' },
      assets: lightwellBackgroundAssets,
    }}
  />
);

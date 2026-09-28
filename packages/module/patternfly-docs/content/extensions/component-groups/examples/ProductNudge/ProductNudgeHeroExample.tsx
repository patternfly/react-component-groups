import React from 'react';
import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

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
    }}
  />
);

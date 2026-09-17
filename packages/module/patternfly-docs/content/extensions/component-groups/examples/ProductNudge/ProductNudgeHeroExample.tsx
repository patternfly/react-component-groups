import React from 'react';
import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import LightwellHeroImage from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-hero.png';
import LightwellLogo from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo.png';
import RedHatIBMLockup from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/RedHatIBMLockup.svg';

export const ProductNudgeHeroExample: React.FunctionComponent = () => (
  <ProductNudge
    prominence="hero"
    behavior="dismissible"
    isEligible
    onAction={() => alert('CTA clicked')}
    content={{
      id: 'example.hero',
      headline: 'Accelerate open-source adoption with Lightwell',
      body: 'Lightwell maps your package catalog to the Red Hat ecosystem, so your teams can modernize faster with supported, enterprise-grade alternatives.',
      cta: { label: 'Get in touch', action: 'contact' },
      assets: {
        logo: { src: LightwellLogo, alt: 'Lightwell' },
        backgroundImage: LightwellHeroImage,
        partnerLockup: { src: RedHatIBMLockup, alt: 'Red Hat and IBM' },
      },
    }}
    metrics={[
      { label: 'packages analyzed', value: 847, format: 'count' },
      { label: 'match rate', value: 37, format: 'percentage' },
    ]}
  />
);

export default ProductNudgeHeroExample;

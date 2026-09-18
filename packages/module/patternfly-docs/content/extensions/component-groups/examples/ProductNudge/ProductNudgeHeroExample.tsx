import React from 'react';
import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import LightwellBgLight from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-bg-light.png';
import LightwellBgDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-bg-dark.png';
import LightwellLogo from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo.svg';
import LightwellLogoDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo-dark.svg';
import RedHatIBMLockup from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/RedHatIBMLockup.svg';
import RedHatIBMLockupDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/RedHatIBMLockupDark.svg';

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
        logoDark: { src: LightwellLogoDark, alt: 'Lightwell' },
        backgroundImageLight: LightwellBgLight,
        backgroundImageDark: LightwellBgDark,
        partnerLockup: { src: RedHatIBMLockup, alt: 'Red Hat and IBM' },
        partnerLockupDark: { src: RedHatIBMLockupDark, alt: 'Red Hat and IBM' },
      },
    }}
  />
);

export default ProductNudgeHeroExample;

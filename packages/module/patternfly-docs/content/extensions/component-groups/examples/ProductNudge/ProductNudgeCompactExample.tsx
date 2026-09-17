import React from 'react';
import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import LightwellLogo from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo.png';

export const ProductNudgeCompactExample: React.FunctionComponent = () => (
  <ProductNudge
    prominence="compact"
    behavior="dismissible"
    isEligible
    onAction={() => alert('CTA clicked')}
    content={{
      id: 'example.compact',
      headline: 'Reduce open-source risk with Lightwell',
      body: 'Get enterprise-supported alternatives for your open-source packages.',
      cta: {
        label: 'Learn more',
        action: 'link',
        href: 'https://www.redhat.com/en/lightwell',
      },
      assets: {
        logo: { src: LightwellLogo, alt: 'Lightwell' },
      },
    }}
  />
);

export default ProductNudgeCompactExample;

import React from 'react';
import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import LightwellLogomark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logomark-light.svg';
import LightwellLogomarkDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logomark-dark.svg';

export const ProductNudgeAlertExample: React.FunctionComponent = () => (
  <ProductNudge
    prominence="alert"
    behavior="dismissible"
    isEligible
    onAction={() => alert('CTA clicked')}
    content={{
      id: 'example.alert',
      headline: 'Application dependency risk can increase remediation effort across your OpenShift estate',
      body: 'Lightwell, a joint effort between Red Hat and IBM, provides another remediation approach for qualifying application dependencies.',
      cta: {
        label: 'Learn more about Lightwell',
        action: 'link',
        href: 'https://www.redhat.com/en/lightwell',
      },
      assets: {
        logo: { src: LightwellLogomark, alt: 'Lightwell' },
        logoDark: { src: LightwellLogomarkDark, alt: 'Lightwell' },
      },
    }}
  />
);

export default ProductNudgeAlertExample;

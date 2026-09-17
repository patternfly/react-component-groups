import React from 'react';
import { DescriptionList } from '@patternfly/react-core';
import ProductNudgeField from '@patternfly/react-component-groups/dist/dynamic/ProductNudgeField';
import LightwellLogo from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo.png';

export const ProductNudgeFieldExample: React.FunctionComponent = () => (
  <DescriptionList>
    <ProductNudgeField
      isEligible
      titleText="Modernize with Lightwell"
      bodyText="Get enterprise-supported alternatives for your open-source packages."
      ctaText="Learn more about Lightwell"
      ctaUrl="https://www.redhat.com/en/lightwell"
      logo={{ src: LightwellLogo, alt: 'Lightwell' }}
    />
  </DescriptionList>
);

export default ProductNudgeFieldExample;

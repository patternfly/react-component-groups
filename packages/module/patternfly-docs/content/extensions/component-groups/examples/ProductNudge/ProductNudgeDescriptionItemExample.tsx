import React from 'react';
import {
  DescriptionList
} from '@patternfly/react-core';
import { ProductNudgeDescriptionItem } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import LightwellLogo from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo.svg';
import LightwellLogoDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo-dark.svg';

export const ProductNudgeDescriptionItemExample: React.FunctionComponent = () => (
  <DescriptionList isHorizontal>
    <ProductNudgeDescriptionItem
      isEligible
      headline="8 high-priority vulnerabilities require attention"
      bodyText="When a vulnerability requires upgrading a third-party dependency your environment already relies on, Lightwell may provide a backported security fix for the existing version instead."
      ctaText="Learn more about Lightwell"
      ctaUrl="https://www.redhat.com/en/lightwell"
      logo={{ src: LightwellLogo, alt: 'Lightwell' }}
      logoDark={{ src: LightwellLogoDark, alt: 'Lightwell' }}
    />
  </DescriptionList>
);

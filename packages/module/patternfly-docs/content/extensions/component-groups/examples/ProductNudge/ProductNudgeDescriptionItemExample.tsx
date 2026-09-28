import React from 'react';
import {
  DescriptionList
} from '@patternfly/react-core';
import { ProductNudgeDescriptionItem } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

export const ProductNudgeDescriptionItemExample: React.FunctionComponent = () => (
  <DescriptionList isHorizontal>
    <ProductNudgeDescriptionItem
      isEligible
      brand="lightwell"
      termText="Lightwell"
      headline="8 high-priority vulnerabilities require attention"
      bodyText="When a vulnerability requires upgrading a third-party dependency your environment already relies on, Lightwell may provide a backported security fix for the existing version instead."
      ctaText="Learn more about Lightwell"
      ctaUrl="https://www.redhat.com/en/lightwell"
    />
  </DescriptionList>
);

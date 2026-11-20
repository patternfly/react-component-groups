import React from 'react';
import { ProductNudgeStack } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

export const ProductNudgeStackExample: React.FunctionComponent = () => (
  <ProductNudgeStack
    isEligible
    brand="lightwell"
    titleText="Lightwell remediation"
    value="6 clusters threatened"
    bodyText="When a vulnerability requires upgrading a third-party dependency your environment already relies on, Lightwell may provide a backported security fix for the existing version instead."
    ctaText="Learn more about Lightwell"
    ctaUrl="https://www.redhat.com/en/lightwell"
  />
);

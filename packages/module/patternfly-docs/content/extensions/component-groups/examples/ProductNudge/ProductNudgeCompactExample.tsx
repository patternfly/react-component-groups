import React from 'react';
import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

export const ProductNudgeCompactExample: React.FunctionComponent = () => (
  <ProductNudge
    variant="compact"
    brand="lightwell"
    behavior="dismissible"
    isEligible
    metrics={[ { label: 'clusters threatened', value: 6, format: 'count' } ]}
    onDismiss={() => alert('Nudge dismissed')}
    content={{
      id: 'example.compact',
      headline: 'Lightwell remediation',
      body: 'When a vulnerability requires upgrading a dependency your environment already relies on, Lightwell may provide a backported security fix for the existing version.',
      cta: {
        label: 'Learn more about Lightwell',
        action: 'link',
        href: 'https://www.redhat.com/en/lightwell',
      },
    }}
  />
);

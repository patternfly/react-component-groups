import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';
import { ProductNudgeDataModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

export const ProductNudgeDataModalExample: React.FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open match analysis modal
      </Button>
      <ProductNudgeDataModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        brand="lightwell"
        matchData={{ exact: 118, partial: 195, noMatch: 534 }}
        ecosystemData={[
          { name: 'Java', exact: 70, partial: 120, noMatch: 180 },
          { name: 'Python', exact: 50, partial: 80, noMatch: 170 },
        ]}
        titleText="Lightwell Lens"
        descriptionText="Lightwell helps secure open source dependencies at scale with validated fixes for the versions you already run."
        footerText="Download a shareable report with match results and remediation guidance."
        primaryAction={{ label: 'Download report', onClick: () => alert('Report downloaded') }}
        secondaryAction={{ label: 'Learn more about Lightwell', href: 'https://www.redhat.com/en/lightwell' }}
      />
    </>
  );
};

import React, { useState } from 'react';
import { Button, Checkbox } from '@patternfly/react-core';
import { ProductNudgeDataModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

export const ProductNudgeDataModalExample: React.FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ useLightwell, setUseLightwell ] = useState(true);

  return (
    <>
      <Checkbox
        id="data-modal-use-lightwell"
        label="Use Lightwell branding"
        isChecked={useLightwell}
        onChange={(_event, checked) => setUseLightwell(checked)}
      />
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open data modal example
      </Button>
      <ProductNudgeDataModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        brand={useLightwell ? 'lightwell' : undefined}
        matchData={{ exact: 118, partial: 195, noMatch: 534 }}
        ecosystemData={[
          { name: 'Java', exact: 70, partial: 120, noMatch: 180 },
          { name: 'Python', exact: 50, partial: 80, noMatch: 170 },
        ]}
        {...(useLightwell ? {
          titleText: 'Lightwell Lens',
          descriptionText: 'Lightwell helps secure open source dependencies at scale with validated fixes for the versions you already run.',
          footerText: 'Download a shareable report with match results and remediation guidance.',
          primaryAction: { label: 'Download report', onClick: () => alert('Report downloaded') },
          secondaryAction: { label: 'Learn more about Lightwell', href: 'https://www.redhat.com/en/lightwell' },
        } : {
          titleText: 'Title text',
          descriptionText: 'Review package matches with a palette supplied by your application.',
          footerText: 'Download a shareable report with match results.',
          primaryAction: { label: 'CTA text', onClick: () => alert('Report downloaded') },
          chartColors: [ '#0066cc', '#4cb140', '#c9190b' ],
        })}
      />
    </>
  );
};

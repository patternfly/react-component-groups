import React, { useState } from 'react';
import { Button, Flex, FlexItem } from '@patternfly/react-core';
import { ProductNudgeContactModal, ProductNudgeDataModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

// An inline SVG keeps the custom partner logo self-contained in this example.
const partnerLogo = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="36"><rect width="150" height="36" rx="5" fill="#152935"/><text x="12" y="25" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff">Acme + Red Hat</text></svg>',
  )}`,
  alt: 'Acme and Red Hat',
};

export const ProductNudgeCustomOptionsExample: React.FunctionComponent = () => {
  const [ isDataModalOpen, setIsDataModalOpen ] = useState(false);
  const [ isContactModalOpen, setIsContactModalOpen ] = useState(false);

  return (
    <>
      <Flex gap={{ default: 'gapMd' }}>
        <FlexItem>
          <Button variant="primary" onClick={() => setIsDataModalOpen(true)}>
            Open customized analysis
          </Button>
        </FlexItem>
        <FlexItem>
          <Button variant="secondary" onClick={() => setIsContactModalOpen(true)}>
            Open custom contact form
          </Button>
        </FlexItem>
      </Flex>
      <ProductNudgeDataModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        matchData={{ exact: 118, partial: 195, noMatch: 534 }}
        ecosystemData={[
          { name: 'Java', exact: 70, partial: 120, noMatch: 180 },
          { name: 'Python', exact: 50, partial: 80, noMatch: 170 },
        ]}
        titleText="Acme dependency analysis"
        titleIcon={(
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: '#152935',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          >
            A
          </span>
        )}
        partnerLogo={partnerLogo}
        chartColors={[ '#6753ac', '#39a5dc', '#c9190b' ]}
        descriptionText="Review package matches with a palette and brand assets supplied by your application."
        footerText="Contact our team to discuss your results."
      />
      <ProductNudgeContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        titleText="Talk to an Acme specialist"
        descriptionText="Tell us a little about your organization and we'll be in touch."
        submitText="Request a consultation"
        fields={[
          {
            name: 'company',
            label: 'Company',
            placeholder: 'Acme, Inc.',
            isRequired: true,
            autoComplete: 'organization',
          },
          {
            name: 'workEmail',
            label: 'Work email',
            type: 'email',
            placeholder: 'you@example.com',
            isRequired: true,
            autoComplete: 'email',
          },
          {
            name: 'packageCount',
            label: 'Number of packages',
            type: 'number',
            placeholder: '100',
            helpText: 'An estimate is fine.',
          },
        ]}
        partnerLogo={partnerLogo}
        onSubmit={async (values) => {
          // eslint-disable-next-line no-console
          console.log('Custom contact form submitted:', values);
          setIsContactModalOpen(false);
          alert(`Contact form submitted:\n${JSON.stringify(values, null, 2)}`);
        }}
        successMessage="Thanks — our team will be in touch."
      />
    </>
  );
};

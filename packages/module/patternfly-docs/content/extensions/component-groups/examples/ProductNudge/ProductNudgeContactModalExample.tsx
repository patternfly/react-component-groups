import React, { useState } from 'react';
import { Button, Checkbox } from '@patternfly/react-core';
import { ProductNudgeContactModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

export const ProductNudgeContactModalExample: React.FunctionComponent = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ useLightwell, setUseLightwell ] = useState(true);

  return (
    <>
      <Checkbox
        id="contact-modal-use-lightwell"
        label="Use Lightwell branding"
        isChecked={useLightwell}
        onChange={(_event, checked) => setUseLightwell(checked)}
      />
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Open contact modal
      </Button>
      <ProductNudgeContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brand={useLightwell ? 'lightwell' : undefined}
        onSubmit={async (values) => {
          // eslint-disable-next-line no-console
          console.log('Contact form submitted:', values);
          setIsModalOpen(false);
          alert(`Contact form submitted:\n${JSON.stringify(values, null, 2)}`);
        }}
        {...(useLightwell ? {
          titleText: 'Contact us',
          descriptionText: 'Leave your details and a Red Hat representative will get in touch about how Lightwell can help secure open source dependencies in your environment.',
          submitText: 'Submit',
          successMessage: 'Thanks — a Red Hat representative will be in touch.',
        } : {
          titleText: 'Title text',
          descriptionText: 'Tell us a little about your organization and we\'ll be in touch.',
          submitText: 'CTA text',
          successMessage: 'Thanks — our team will be in touch.',
          fields: [
            {
              name: 'company',
              label: 'Company',
              placeholder: 'Your company',
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
          ],
        })}
      />
    </>
  );
};

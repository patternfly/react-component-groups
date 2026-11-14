import React, { useState } from 'react';
import { Button, List, ListItem } from '@patternfly/react-core';
import { ProductNudgeContactModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

export const ProductNudgeContactModalErrorExample: React.FunctionComponent = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ errors, setErrors ] = useState<string[]>([]);

  return (
    <>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Open contact modal with submission error
      </Button>
      <ProductNudgeContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        titleText="Contact us"
        descriptionText="Tell us a little about your organization and we'll be in touch."
        submitText="Submit"
        fields={[
          { name: 'company', label: 'Company', placeholder: 'Your company', isRequired: true, autoComplete: 'organization' },
          { name: 'workEmail', label: 'Work email', type: 'text', placeholder: 'you@example.com', isRequired: true, autoComplete: 'email' },
        ]}
        errorTitle="Unable to submit your request"
        errorMessage={(
          <List isPlain>
            {errors.map((error) => <ListItem key={error}>{error}</ListItem>)}
          </List>
        )}
        // Validate in onSubmit, describe every invalid field, then reject. The modal shows the
        // error alert and moves focus to it.
        onSubmit={async (values) => {
          const nextErrors: string[] = [];
          if (!values.company?.trim()) {
            nextErrors.push('Company is required. Enter the name of your organization.');
          }
          if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.workEmail ?? '')) {
            nextErrors.push('Work email format is invalid. Please ensure your email follows a format similar to john@mail.com.');
          }
          if (nextErrors.length > 0) {
            setErrors(nextErrors);
            throw new Error('Validation failed');
          }
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

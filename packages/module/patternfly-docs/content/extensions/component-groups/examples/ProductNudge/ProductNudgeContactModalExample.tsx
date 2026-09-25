import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';
import { ProductNudgeContactModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

export const ProductNudgeContactModalExample: React.FunctionComponent = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Open contact modal
      </Button>
      <ProductNudgeContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        titleText="Contact us"
        descriptionText="Leave your details and a Red Hat representative will get in touch about how Lightwell can help secure open source dependencies in your environment."
        onSubmit={async (values) => {
          // eslint-disable-next-line no-console
          console.log('Contact form submitted:', values);
        }}
        submitText="Submit"
      />
    </>
  );
};

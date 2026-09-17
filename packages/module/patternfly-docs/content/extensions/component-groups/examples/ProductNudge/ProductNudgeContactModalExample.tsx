import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';
import ProductNudgeContactModal from '@patternfly/react-component-groups/dist/dynamic/ProductNudgeContactModal';
import RedHatLogo from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/RedHatLogo.svg';
import IBMLogo from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/ibm_cloud-icon.svg';

export const ProductNudgeContactModalExample: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open contact modal
      </Button>
      <ProductNudgeContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={{
          title: 'Get in touch',
          intro: 'Tell us about your environment and we\'ll connect you with the right team.',
          messageTemplate: 'I have {{total}} open-source packages I\'d like to migrate.',
          consent: 'By submitting this form, you agree to be contacted by Red Hat or IBM about Lightwell.',
          successMessage: 'Thanks! We\'ll be in touch shortly.',
        }}
        metrics={[{ label: 'packages', value: 847, format: 'count', key: 'total' }]}
        prefillName="Your Name"
        prefillEmail="your@email.com"
        onSubmit={async (values) => {
          // eslint-disable-next-line no-console
          console.log('Contact form submitted:', values);
        }}
        footerContent={
          <>
            <img src={RedHatLogo} alt="Red Hat" style={{ maxHeight: '1.5rem', maxWidth: '5rem' }} />
            <img src={IBMLogo} alt="IBM" style={{ maxHeight: '1.5rem', maxWidth: '5rem', marginLeft: '0.5rem' }} />
          </>
        }
      />
    </>
  );
};

export default ProductNudgeContactModalExample;

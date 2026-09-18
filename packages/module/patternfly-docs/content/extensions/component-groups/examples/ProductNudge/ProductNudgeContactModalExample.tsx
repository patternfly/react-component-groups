import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';
import { ProductNudgeContactModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import LightwellLogo from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo.svg';
import LightwellLogoDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo-dark.svg';
import LightwellBgLight from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-bg-light.png';
import LightwellBgDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-bg-dark.png';
import RedHatIBMLockup from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/RedHatIBMLockup.svg';
import RedHatIBMLockupDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/RedHatIBMLockupDark.svg';

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
          intro: 'A Red Hat representative will get in touch about how Lightwell can help your environment.',
          successMessage: "Thanks — we've received your request. A representative will reach out shortly.",
        }}
        headerLogo={{ src: LightwellLogo, alt: 'Lightwell', name: 'Lightwell' }}
        headerLogoDark={{ src: LightwellLogoDark, alt: 'Lightwell' }}
        backgroundImage={LightwellBgLight}
        backgroundImageDark={LightwellBgDark}
        partnerLogos={
          <img src={RedHatIBMLockup} alt="Red Hat and IBM" style={{ height: '1.25rem', width: 'auto' }} />
        }
        partnerLogosDark={
          <img src={RedHatIBMLockupDark} alt="Red Hat and IBM" style={{ height: '1.25rem', width: 'auto' }} />
        }
        onSubmit={async (values) => {
          // eslint-disable-next-line no-console
          console.log('Contact form submitted:', values);
        }}
      />
    </>
  );
};

export default ProductNudgeContactModalExample;

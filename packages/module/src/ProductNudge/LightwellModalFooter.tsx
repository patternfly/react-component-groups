import { FunctionComponent } from 'react';
import RedHatLogo from './assets/RedHatLogo.svg';
import IBMCloudIcon from './assets/ibm_cloud-icon.svg';

/**
 * Default footer for ProductNudgeContactModal showing the Red Hat + IBM logo lockup.
 * Pass as `footerContent={<LightwellModalFooter />}`.
 */
export const LightwellModalFooter: FunctionComponent = () => (
  <>
    <img src={RedHatLogo} alt="Red Hat" style={{ maxHeight: '1.5rem', maxWidth: '5rem' }} />
    <img src={IBMCloudIcon} alt="IBM" style={{ maxHeight: '1.5rem', maxWidth: '5rem' }} />
  </>
);

export default LightwellModalFooter;

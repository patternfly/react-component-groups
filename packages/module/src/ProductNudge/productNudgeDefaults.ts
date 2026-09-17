import LightwellHeroImage from './assets/lightwell-hero.png';
import LightwellLogo from './assets/lightwell-logo.png';
import RedHatIBMLockup from './assets/RedHatIBMLockup.svg';
import RedHatLogo from './assets/RedHatLogo.svg';
import IBMCloudIcon from './assets/ibm_cloud-icon.svg';

import { NudgeContact, NudgeContent } from './ProductNudge.types';

/** Individual asset exports for consumers that need direct access. */
export { LightwellLogo, LightwellHeroImage, RedHatIBMLockup, RedHatLogo, IBMCloudIcon };

/** Assembled assets for a full hero nudge (logo + background image + partner lockup). */
export const lightwellHeroAssets: NudgeContent['assets'] = {
  logo: { src: LightwellLogo, alt: 'Lightwell' },
  backgroundImage: LightwellHeroImage,
  partnerLockup: { src: RedHatIBMLockup, alt: 'Red Hat and IBM' },
};

/** Assembled assets for a compact nudge (logo only). */
export const lightwellCompactAssets: NudgeContent['assets'] = {
  logo: { src: LightwellLogo, alt: 'Lightwell' },
};

/**
 * Default contact form content for a Lightwell get-in-touch modal.
 * Override individual fields as needed for your placement's copy.
 */
export const lightwellDefaultContact: NudgeContact = {
  title: 'Get in touch',
  intro:
    'Tell us about your environment and a Red Hat representative will follow up with next steps.',
  messageTemplate:
    "I'd like to learn more about Lightwell coverage for my organization's {{total}} vulnerable packages ({{coveragePercentage}}% may have supported alternatives).",
  consent:
    'By submitting, you agree that Red Hat and IBM may use this information to contact you about Lightwell.',
  successMessage:
    "Thanks — we've received your request. A representative will reach out shortly.",
};

/**
 * Default footer content for ProductNudgeContactModal (Red Hat + IBM lockup).
 * Pass as the `footerContent` prop.
 */
export const LightwellModalFooter = () => (
  <>
    <img src={RedHatLogo} alt="Red Hat" style={{ maxHeight: '1.5rem', maxWidth: '5rem' }} />
    <img src={IBMCloudIcon} alt="IBM" style={{ maxHeight: '1.5rem', maxWidth: '5rem' }} />
  </>
);

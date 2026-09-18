import LightwellLogo from './assets/lightwell-logo.svg';
import LightwellLogoDark from './assets/lightwell-logo-dark.svg';
import LightwellLogomark from './assets/lightwell-logomark-light.svg';
import LightwellLogomarkDark from './assets/lightwell-logomark-dark.svg';
import LightwellBgLight from './assets/lightwell-bg-light.png';
import LightwellBgDark from './assets/lightwell-bg-dark.png';
import RedHatIBMLockup from './assets/RedHatIBMLockup.svg';
import RedHatIBMLockupDark from './assets/RedHatIBMLockupDark.svg';

import { NudgeContact, NudgeContent } from './ProductNudge.types';

/** Individual asset exports for consumers that need direct access. */
export { LightwellLogo, LightwellLogoDark, LightwellLogomark, LightwellLogomarkDark, LightwellBgLight, LightwellBgDark, RedHatIBMLockup, RedHatIBMLockupDark };

/** Assembled assets for a full hero nudge (logo + background image + partner lockup). */
export const lightwellHeroAssets: NudgeContent['assets'] = {
  logo: { src: LightwellLogo, alt: 'Lightwell' },
  logoDark: { src: LightwellLogoDark, alt: 'Lightwell' },
  backgroundImageLight: LightwellBgLight,
  backgroundImageDark: LightwellBgDark,
  partnerLockup: { src: RedHatIBMLockup, alt: 'Red Hat and IBM' },
  partnerLockupDark: { src: RedHatIBMLockupDark, alt: 'Red Hat and IBM' },
};

/** Assembled assets for an alert or field nudge (logomark icon). */
export const lightwellAlertAssets: NudgeContent['assets'] = {
  logo: { src: LightwellLogomark, alt: 'Lightwell' },
  logoDark: { src: LightwellLogomarkDark, alt: 'Lightwell' },
};

/**
 * Default contact form content for a Lightwell get-in-touch modal.
 * Override individual fields as needed for your placement's copy.
 */
export const lightwellDefaultContact: NudgeContact = {
  title: 'Get in touch',
  intro:
    'A Red Hat representative will get in touch about how Lightwell can help your environment.',
  successMessage:
    "Thanks — we've received your request. A representative will reach out shortly.",
};

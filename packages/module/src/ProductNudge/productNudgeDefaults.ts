import LightwellLogo from './assets/lightwell-logo.svg';
import LightwellLogoDark from './assets/lightwell-logo-dark.svg';
import LightwellLogomark from './assets/lightwell-logomark-light.svg';
import LightwellLogomarkDark from './assets/lightwell-logomark-dark.svg';
import LightwellBgLight from './assets/lightwell-bg-light.png';
import LightwellBgDark from './assets/lightwell-bg-dark.png';
import RedHatIBMLogo from './assets/RedHatIBMLogo.svg';
import RedHatIBMLogoDark from './assets/RedHatIBMLogoDark.svg';

import { NudgeContact, NudgeContent, ProductNudgeBrandAssets } from './ProductNudge.types';

/** Individual asset exports for consumers that need direct access. */
export { LightwellLogo, LightwellLogoDark, LightwellLogomark, LightwellLogomarkDark, LightwellBgLight, LightwellBgDark, RedHatIBMLogo, RedHatIBMLogoDark };

/** Visual defaults for `brand="lightwell"`. Product copy is intentionally not included. */
export const lightwellBrandAssets: ProductNudgeBrandAssets = {
  logo: { src: LightwellLogo, alt: 'Lightwell' },
  logoDark: { src: LightwellLogoDark, alt: 'Lightwell' },
  logomark: { src: LightwellLogomark, alt: 'Lightwell' },
  logomarkDark: { src: LightwellLogomarkDark, alt: 'Lightwell' },
  backgroundImageLight: LightwellBgLight,
  backgroundImageDark: LightwellBgDark,
  partnerLogo: { src: RedHatIBMLogo, alt: 'Red Hat and IBM' },
  partnerLogoDark: { src: RedHatIBMLogoDark, alt: 'Red Hat and IBM' },
};

/** Assembled assets for a full hero nudge (logo + background image + partner logo). */
export const lightwellHeroAssets: NudgeContent['assets'] = {
  ...lightwellBrandAssets,
};

/** Assembled assets for an alert or field nudge (logomark icon). */
export const lightwellAlertAssets: NudgeContent['assets'] = {
  logo: lightwellBrandAssets.logomark,
  logoDark: lightwellBrandAssets.logomarkDark,
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

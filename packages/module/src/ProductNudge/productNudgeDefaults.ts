import LightwellLogo from './assets/lightwell-logo.svg';
import LightwellLogoDark from './assets/lightwell-logo-dark.svg';
import LightwellLogomark from './assets/lightwell-logomark-light.svg';
import LightwellLogomarkDark from './assets/lightwell-logomark-dark.svg';
import RedHatIBMLogo from './assets/RedHatIBMLogo.svg';
import RedHatIBMLogoDark from './assets/RedHatIBMLogoDark.svg';

import { NudgeContent, ProductNudgeBrandAssets } from './ProductNudge.types';

/** Individual asset exports for consumers that need direct access. */
export { LightwellLogo, LightwellLogoDark, LightwellLogomark, LightwellLogomarkDark, RedHatIBMLogo, RedHatIBMLogoDark };

/**
 * Visual defaults for `brand="lightwell"`. Product copy is intentionally not included.
 * Alt text below ("Lightwell", "Red Hat and IBM") is part of the Lightwell preset itself,
 * not generic component chrome — it travels with its asset, so a consumer overriding any
 * of these images (via `content.assets` or a component's `logo`/`logoDark`/`partnerLogo`
 * props) supplies their own matching alt text in the same call.
 *
 * Background images are intentionally NOT included here — see `productNudgeLightwellBackgrounds.ts`.
 */
export const lightwellBrandAssets: ProductNudgeBrandAssets = {
  logo: { src: LightwellLogo, alt: 'Lightwell' },
  logoDark: { src: LightwellLogoDark, alt: 'Lightwell' },
  logomark: { src: LightwellLogomark, alt: 'Lightwell' },
  logomarkDark: { src: LightwellLogomarkDark, alt: 'Lightwell' },
  partnerLogo: { src: RedHatIBMLogo, alt: 'Red Hat and IBM' },
  partnerLogoDark: { src: RedHatIBMLogoDark, alt: 'Red Hat and IBM' },
};

/** Assembled assets for a full hero nudge (logo + partner logo). Add the Lightwell background
 * images from `productNudgeLightwellBackgrounds.ts` for a hero nudge that needs one. */
export const lightwellHeroAssets: NudgeContent['assets'] = {
  ...lightwellBrandAssets,
};

/** Assembled assets for an alert or field nudge (logomark icon). */
export const lightwellAlertAssets: NudgeContent['assets'] = {
  logo: lightwellBrandAssets.logomark,
  logoDark: lightwellBrandAssets.logomarkDark,
};

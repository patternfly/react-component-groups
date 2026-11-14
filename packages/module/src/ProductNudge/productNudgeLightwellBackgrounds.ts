import LightwellBgLight from './assets/lightwell-bg-light.png';
import LightwellBgDark from './assets/lightwell-bg-dark.png';

import { ProductNudgeBrandAssets } from './ProductNudge.types';

/** Individual asset exports for consumers that need direct access. */
export { LightwellBgLight, LightwellBgDark };

/**
 * Lightwell's hero background images (~2MB combined). Deliberately NOT re-exported from
 * `index.ts` so non-Lightwell consumers never pay for these bytes regardless of bundler
 * tree-shaking configuration. Lightwell hero nudges that need a background opt in with one
 * extra import, spreading this into `content.assets` alongside `lightwellBrandAssets`:
 *
 * ```ts
 * import { lightwellBrandAssets } from '@patternfly/react-component-groups/dist/esm/ProductNudge/productNudgeDefaults';
 * import { lightwellBackgroundAssets } from '@patternfly/react-component-groups/dist/esm/ProductNudge/productNudgeLightwellBackgrounds';
 *
 * content.assets = { ...lightwellBrandAssets, ...lightwellBackgroundAssets };
 * ```
 */
export const lightwellBackgroundAssets: Pick<ProductNudgeBrandAssets, 'backgroundImageLight' | 'backgroundImageDark'> = {
  backgroundImageLight: LightwellBgLight,
  backgroundImageDark: LightwellBgDark,
};

export default lightwellBackgroundAssets;

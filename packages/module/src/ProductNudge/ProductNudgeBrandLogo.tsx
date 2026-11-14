import { FunctionComponent } from 'react';
import { css } from '@patternfly/react-styles';
import { createUseStyles } from 'react-jss';

import { ProductNudgeImage } from './ProductNudge.types';
import { nudgeModeStyles, partnerLogoStyles } from './nudgeStyles';

const useStyles = createUseStyles({
  partnerLogo: partnerLogoStyles,
  ...nudgeModeStyles,
});

export interface ProductNudgeBrandLogoProps {
  /** Logo shown in light mode (and in dark mode when `dark` is not provided). */
  light?: ProductNudgeImage;
  /** Logo shown in dark mode; falls back to `light` when not provided. */
  dark?: ProductNudgeImage;
  /** Additional CSS class applied to each rendered image. */
  className?: string;
}

/** Shared light/dark-mode rendering for an optional partner logo. */
export const ProductNudgeBrandLogo: FunctionComponent<ProductNudgeBrandLogoProps> = ({
  light,
  dark,
  className,
}) => {
  const classes = useStyles();

  if (!light && !dark) {
    return null;
  }

  return (
    <>
      {light && (
        <img
          src={light.src}
          alt={light.alt}
          className={css(classes.partnerLogo, dark ? classes.lightModeOnly : undefined, className)}
        />
      )}
      {dark && (
        <img
          src={dark.src}
          alt={dark.alt}
          className={css(classes.partnerLogo, classes.darkModeOnly, className)}
        />
      )}
    </>
  );
};

export default ProductNudgeBrandLogo;

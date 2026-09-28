import { FunctionComponent } from 'react';
import { css } from '@patternfly/react-styles';
import { createUseStyles } from 'react-jss';

import { ProductNudgeImage } from './ProductNudge.types';
import { nudgeModeStyles, partnerLogoStyles } from './nudgeStyles';

const useStyles = createUseStyles({
  partnerLogo: partnerLogoStyles,
  ...nudgeModeStyles,
});

interface ProductNudgeBrandLogoProps {
  light?: ProductNudgeImage;
  dark?: ProductNudgeImage;
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

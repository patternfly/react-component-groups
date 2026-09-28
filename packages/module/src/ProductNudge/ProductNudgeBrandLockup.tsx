import { FunctionComponent } from 'react';
import { css } from '@patternfly/react-styles';
import { createUseStyles } from 'react-jss';

import { ProductNudgeImage } from './ProductNudge.types';
import { nudgeModeStyles, partnerLockupStyles } from './nudgeStyles';

const useStyles = createUseStyles({
  partnerLockup: partnerLockupStyles,
  ...nudgeModeStyles,
});

interface ProductNudgeBrandLockupProps {
  light?: ProductNudgeImage;
  dark?: ProductNudgeImage;
  className?: string;
}

/** Shared light/dark-mode rendering for an optional partner lockup. */
export const ProductNudgeBrandLockup: FunctionComponent<ProductNudgeBrandLockupProps> = ({
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
          className={css(classes.partnerLockup, dark ? classes.lightModeOnly : undefined, className)}
        />
      )}
      {dark && (
        <img
          src={dark.src}
          alt={dark.alt}
          className={css(classes.partnerLockup, classes.darkModeOnly, className)}
        />
      )}
    </>
  );
};

export default ProductNudgeBrandLockup;

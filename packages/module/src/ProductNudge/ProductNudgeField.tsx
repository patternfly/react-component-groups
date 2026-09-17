import { FunctionComponent } from 'react';

import {
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

import { ProductNudgeFieldProps } from './ProductNudge.types';

const useStyles = createUseStyles({
  logo: {
    display: 'block',
    maxWidth: '8rem',
    width: '100%',
  },
});

/**
 * An in-context detail variant of ProductNudge, designed to embed inside an existing
 * PatternFly DescriptionList (e.g. a cluster details card). Renders a logo as the term
 * and a headline + body + link as the description.
 */
export const ProductNudgeField: FunctionComponent<ProductNudgeFieldProps> = ({
  isEligible,
  titleText,
  bodyText,
  ctaText,
  ctaUrl,
  logo,
  ouiaId = 'ProductNudgeField',
  className,
  'data-testid': dataTestId,
}) => {
  const classes = useStyles();

  if (!isEligible) {
    return null;
  }

  return (
    <DescriptionListGroup
      className={className}
      data-ouia-component-id={ouiaId}
      data-testid={dataTestId}
    >
      <DescriptionListTerm>
        {logo && (
          <img className={classes.logo} src={logo.src} alt={logo.alt} />
        )}
      </DescriptionListTerm>
      <DescriptionListDescription>
        <strong>{titleText}</strong>
        <p>{bodyText}</p>
        {ctaUrl && (
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer">
            {ctaText ?? 'Learn more'}
          </a>
        )}
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
};

export default ProductNudgeField;

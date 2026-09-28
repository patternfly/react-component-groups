import { FunctionComponent } from 'react';

import {
  Button,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon.js';
import { createUseStyles } from 'react-jss';

import { ProductNudgeDescriptionItemProps } from './ProductNudge.types';
import { nudgeModeStyles } from './nudgeStyles';
import { lightwellBrandAssets } from './productNudgeDefaults';

const useStyles = createUseStyles({
  term: {
    alignSelf: 'start',
  },
  termIcon: {
    display: 'block',
    width: '1.5rem',
    height: 'auto',
  },
  ...nudgeModeStyles,
});

/**
 * A DescriptionList item variant of ProductNudge. Renders as a DescriptionListGroup
 * so it can be dropped directly inside an existing DescriptionList alongside other items.
 * Term content and icon are caller supplied; the description renders headline, body, and link content.
 */
export const ProductNudgeDescriptionItem: FunctionComponent<ProductNudgeDescriptionItemProps> = ({
  isEligible,
  brand,
  termText,
  termIcon,
  headline,
  bodyText,
  ctaText,
  ctaUrl,
  logo,
  logoDark,
  ouiaId = 'ProductNudgeDescriptionItem',
  className,
  'data-testid': dataTestId,
}) => {
  const classes = useStyles();
  const lightTermLogo = logo ?? (brand === 'lightwell' ? lightwellBrandAssets.logomark : undefined);
  const darkTermLogo = logoDark ?? (brand === 'lightwell' && !logo ? lightwellBrandAssets.logomarkDark : undefined);
  const resolvedTermIcon = termIcon ?? ((lightTermLogo || darkTermLogo) ? (
    <>
      {lightTermLogo && (
        <img
          src={lightTermLogo.src}
          alt=""
          aria-hidden
          className={`${classes.termIcon} ${darkTermLogo ? classes.lightModeOnly : ''}`}
        />
      )}
      {darkTermLogo && (
        <img src={darkTermLogo.src} alt="" aria-hidden className={`${classes.termIcon} ${classes.darkModeOnly}`} />
      )}
    </>
  ) : undefined);

  if (!isEligible) {
    return null;
  }

  return (
    <DescriptionListGroup
      className={className}
      data-ouia-component-id={ouiaId}
      data-testid={dataTestId}
    >
      <DescriptionListTerm 
        className={classes.term}
        icon={resolvedTermIcon}
      >
        {termText}
      </DescriptionListTerm>
      <DescriptionListDescription>
        <Stack hasGutter>
          <StackItem><strong>{headline}</strong></StackItem>
          {bodyText && <StackItem>{bodyText}</StackItem>}
          {ctaUrl && (
            <StackItem>
              <Button
                component="a"
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="link"
                isInline
                icon={<ExternalLinkAltIcon />}
                iconPosition="end"
                ouiaId={`${ouiaId}-cta`}
              >
                {ctaText ?? 'Learn more'}
              </Button>
            </StackItem>
          )}
        </Stack>
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
};

export default ProductNudgeDescriptionItem;

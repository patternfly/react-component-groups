import type { FunctionComponent, ReactNode } from 'react';

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

import { ProductNudgeBrand } from './ProductNudge.types';
import { createImageSizeStyle, nudgeModeStyles } from './nudgeStyles';
import { lightwellBrandAssets } from './productNudgeDefaults';

export interface ProductNudgeDescriptionItemProps {
  /** false renders null */
  isEligible: boolean;
  /** Applies a named brand preset; copy remains entirely caller-supplied. */
  brand?: ProductNudgeBrand;
  /** Visible text/content rendered in the description-list term. */
  termText?: string | ReactNode;
  /** Icon displayed in the description-list term. */
  termIcon?: ReactNode;
  /** Bold headline in the description */
  headline: string | ReactNode;
  /** Body paragraph in the description */
  bodyText: string | ReactNode;
  /** CTA link label */
  ctaText?: string;
  /** CTA link href */
  ctaUrl?: string;
  /** Custom term logo/icon image for light mode. */
  logo?: { src: string; alt: string };
  /** Custom term logo/icon image for dark mode. */
  logoDark?: { src: string; alt: string };
  /** Width of the term logo/icon; defaults to '1rem'. */
  logoMarkSize?: string;
  /** Inline-start margin of the term logo/icon; defaults to unset. */
  logoMarkOffset?: string;
  /** OUIA component ID */
  ouiaId?: string;
  /** Additional CSS class on the DescriptionListGroup */
  className?: string;
  /** data-testid forwarded to root */
  'data-testid'?: string;
}

const useStyles = createUseStyles({
  term: {
    alignSelf: 'start',
  },
  termIcon: {
    display: 'block',
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
  logoMarkSize = '1rem',
  logoMarkOffset,
  ouiaId = 'ProductNudgeDescriptionItem',
  className,
  'data-testid': dataTestId,
}: ProductNudgeDescriptionItemProps) => {
  const classes = useStyles();
  const lightTermLogo = logo ?? (brand === 'lightwell' ? lightwellBrandAssets.logomark : undefined);
  const darkTermLogo = logoDark ?? (brand === 'lightwell' && !logo ? lightwellBrandAssets.logomarkDark : undefined);
  const resolvedTermIconStyle = createImageSizeStyle(logoMarkSize, logoMarkOffset);
  const resolvedTermIcon = termIcon ?? ((lightTermLogo || darkTermLogo) ? (
    <>
      {lightTermLogo && (
        <img
          src={lightTermLogo.src}
          alt=""
          aria-hidden
          style={resolvedTermIconStyle}
          className={`${classes.termIcon} ${darkTermLogo ? classes.lightModeOnly : ''}`}
        />
      )}
      {darkTermLogo && (
        <img
          src={darkTermLogo.src}
          alt=""
          aria-hidden
          style={resolvedTermIconStyle}
          className={`${classes.termIcon} ${classes.darkModeOnly}`}
        />
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

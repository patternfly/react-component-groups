import type { FunctionComponent, ReactNode } from 'react';

import {
  Button,
  Flex,
  FlexItem,
  StackItem,
} from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import stackStyles from '@patternfly/react-styles/css/layouts/Stack/stack';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon.js';
import { createUseStyles } from 'react-jss';

import { ProductNudgeBrand } from './ProductNudge.types';
import { createImageSizeStyle, nudgeModeStyles } from './nudgeStyles';
import { lightwellBrandAssets } from './productNudgeDefaults';
import { useImpressionTracking } from './useImpressionTracking';

export interface ProductNudgeStackProps {
  /** false renders null */
  isEligible: boolean;
  /** Called once when the component is at least 50% visible. */
  onImpression?: () => void;
  /** Applies a named brand preset; copy remains entirely caller-supplied. */
  brand?: ProductNudgeBrand;
  /** Icon shown beside the title. */
  titleIcon?: ReactNode;
  /** Heading label rendered beside the logo */
  titleText: string | ReactNode;
  /** Primary value or metric rendered below the heading */
  value?: string | ReactNode;
  /** Body / note text */
  bodyText: string | ReactNode;
  /** CTA link label */
  ctaText?: string;
  /** CTA link href; when omitted, onAction renders a button CTA instead. */
  ctaUrl?: string;
  /** Action callback used instead of a link CTA. */
  onAction?: () => void;
  /** Loading state for an action CTA. */
  isLoading?: boolean;
  /** Logomark shown in the heading row (light mode) */
  logo?: { src: string; alt: string };
  /** Logomark shown in dark mode */
  logoDark?: { src: string; alt: string };
  /** Width of the logomark; defaults to '1rem'. */
  logoMarkSize?: string;
  /** Inline-start margin of the logomark; defaults to unset. */
  logoMarkOffset?: string;
  /** OUIA component ID */
  ouiaId?: string;
  /** Additional CSS class */
  className?: string;
  /** data-testid forwarded to the root element */
  'data-testid'?: string;
}

const useStyles = createUseStyles({
  logomark: {
    display: 'block',
    height: 'auto',
  },
  ...nudgeModeStyles,
  valueText: {
    fontSize: 'var(--pf-t--global--font--size--lg)',
  }
});

/**
 * An in-context detail variant of ProductNudge. Renders a branded stack block
 * with logomark, heading label, optional value, body note, and an inline CTA.
 * Drop it anywhere — no DescriptionList wrapper required.
 */
export const ProductNudgeStack: FunctionComponent<ProductNudgeStackProps> = ({
  isEligible,
  onImpression,
  brand,
  titleIcon,
  titleText,
  value,
  bodyText,
  ctaText,
  ctaUrl,
  onAction,
  isLoading = false,
  logo,
  logoDark,
  logoMarkSize = '1rem',
  logoMarkOffset,
  ouiaId = 'ProductNudgeStack',
  className,
  'data-testid': dataTestId,
}: ProductNudgeStackProps) => {
  const classes = useStyles();
  const impressionRef = useImpressionTracking(onImpression, isEligible);
  const resolvedLogo = logo ?? (brand === 'lightwell' ? lightwellBrandAssets.logomark : undefined);
  const resolvedLogoDark = logoDark ?? (brand === 'lightwell' && !logo ? lightwellBrandAssets.logomarkDark : undefined);
  const resolvedLogoMarkStyle = createImageSizeStyle(logoMarkSize, logoMarkOffset);

  if (!isEligible) {
    return null;
  }

  return (
    <div
      ref={impressionRef}
      className={css(stackStyles.stack, stackStyles.modifiers.gutter, className)}
      data-ouia-component-id={ouiaId}
      data-testid={dataTestId}
    >
      <StackItem>
        <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
          {titleIcon ? (
            <FlexItem>{titleIcon}</FlexItem>
          ) : resolvedLogo && (
            <FlexItem>
              <img
                className={css(classes.logomark, resolvedLogoDark ? classes.lightModeOnly : undefined)}
                style={resolvedLogoMarkStyle}
                src={resolvedLogo.src}
                alt=""
                aria-hidden
              />
              {resolvedLogoDark && (
                <img
                  className={css(classes.logomark, classes.darkModeOnly)}
                  style={resolvedLogoMarkStyle}
                  src={resolvedLogoDark.src}
                  alt=""
                  aria-hidden
                />
              )}
            </FlexItem>
          )}
          <FlexItem><strong>{titleText}</strong></FlexItem>
        </Flex>
      </StackItem>
      {value && <StackItem className={css(classes.valueText)}><strong>{value}</strong></StackItem>}
      {bodyText && <StackItem>{bodyText}</StackItem>}
      {(ctaUrl || onAction) && (
        <StackItem>
          {ctaUrl ? (
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
          ) : (
            <Button
              variant="link"
              isInline
              onClick={onAction}
              isLoading={isLoading}
              isDisabled={isLoading}
              ouiaId={`${ouiaId}-cta`}
            >
              {ctaText ?? 'Learn more'}
            </Button>
          )}
        </StackItem>
      )}
    </div>
  );
};

export default ProductNudgeStack;

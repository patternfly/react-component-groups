import type { FunctionComponent, ReactNode } from 'react';

import {
  Button,
  Flex,
  FlexItem,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon.js';
import { createUseStyles } from 'react-jss';

import { ProductNudgeBrand } from './ProductNudge.types';
import { nudgeModeStyles } from './nudgeStyles';
import { lightwellBrandAssets } from './productNudgeDefaults';

export interface ProductNudgeStackProps {
  /** false renders null */
  isEligible: boolean;
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
    width: '1rem',
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
  ouiaId = 'ProductNudgeStack',
  className,
  'data-testid': dataTestId,
}: ProductNudgeStackProps) => {
  const classes = useStyles();
  const resolvedLogo = logo ?? (brand === 'lightwell' ? lightwellBrandAssets.logomark : undefined);
  const resolvedLogoDark = logoDark ?? (brand === 'lightwell' && !logo ? lightwellBrandAssets.logomarkDark : undefined);

  if (!isEligible) {
    return null;
  }

  return (
    <Stack hasGutter className={className} data-ouia-component-id={ouiaId} data-testid={dataTestId}>
      <StackItem>
        <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
          {titleIcon ? (
            <FlexItem>{titleIcon}</FlexItem>
          ) : resolvedLogo && (
            <FlexItem>
              <img
                className={css(classes.logomark, resolvedLogoDark ? classes.lightModeOnly : undefined)}
                src={resolvedLogo.src}
                alt=""
                aria-hidden
              />
              {resolvedLogoDark && (
                <img
                  className={css(classes.logomark, classes.darkModeOnly)}
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
    </Stack>
  );
};

export default ProductNudgeStack;

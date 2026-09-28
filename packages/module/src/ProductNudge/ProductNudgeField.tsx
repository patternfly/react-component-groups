import { FunctionComponent } from 'react';

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

import { ProductNudgeFieldProps } from './ProductNudge.types';
import { nudgeModeStyles } from './nudgeStyles';
import { lightwellBrandAssets } from './productNudgeDefaults';

const useStyles = createUseStyles({
  logomark: {
    display: 'block',
    width: '1.25rem',
    height: 'auto',
  },
  ...nudgeModeStyles,
  valueText: {
    fontSize: 'var(--pf-t--global--font--size--lg)',
  }
});

/**
 * An in-context detail variant of ProductNudge. Renders a branded stack block
 * with logomark, heading label, optional value, body note, and an inline link CTA.
 * Drop it anywhere — no DescriptionList wrapper required.
 */
export const ProductNudgeField: FunctionComponent<ProductNudgeFieldProps> = ({
  isEligible,
  brand,
  titleIcon,
  titleText,
  value,
  bodyText,
  ctaText,
  ctaUrl,
  logo,
  logoDark,
  ouiaId = 'ProductNudgeField',
  className,
  'data-testid': dataTestId,
}) => {
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
  );
};

export default ProductNudgeField;

import { FunctionComponent } from 'react';

import {
  Button,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon.js';
import { createUseStyles } from 'react-jss';

import { ProductNudgeDescriptionItemProps } from './ProductNudge.types';
import { nudgeModeStyles } from './nudgeStyles';

const useStyles = createUseStyles({
  logo: {
    display: 'block',
    width: '6rem',
    marginInlineStart: 'calc(-1 * var(--pf-t--global--spacer--sm))',
    marginBlockStart: 'calc(-1 * var(--pf-t--global--spacer--xs))',
  },
  term: {
    alignSelf: 'start',
  },
  ...nudgeModeStyles,
});

/**
 * A DescriptionList item variant of ProductNudge. Renders as a DescriptionListGroup
 * so it can be dropped directly inside an existing DescriptionList alongside other items.
 * Term = full Lightwell logo; Description = headline + body + link.
 */
export const ProductNudgeDescriptionItem: FunctionComponent<ProductNudgeDescriptionItemProps> = ({
  isEligible,
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
        icon={(
          <>
            {logo && <img src={logo.src} alt={logo.alt} className={classes.lightModeOnly} />}
            {logoDark && <img src={logoDark.src} alt={logoDark.alt} className={classes.darkModeOnly} />}
          </>
        )}
      >
        Lightwell
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

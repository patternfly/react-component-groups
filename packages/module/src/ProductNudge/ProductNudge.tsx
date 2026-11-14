import type { FunctionComponent, ReactNode } from 'react';
import { useState } from 'react';
import type { TitleProps } from '@patternfly/react-core';

import {
  Alert,
  AlertActionLink,
  Button,
  Content,
  ExpandableSection,
  Flex,
  FlexItem,
  Hero,
  Stack,
  StackItem,
  Title,
  Tooltip,
} from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon.js';
import { createUseStyles } from 'react-jss';

import ErrorBoundary from '../ErrorBoundary';
import { useImpressionTracking } from './useImpressionTracking';
import { ProductNudgeStack } from './ProductNudgeStack';
import {
  createImageSizeStyle,
  createSquareImageSizeStyle,
  LIGHTWELL_BACKGROUND_COLOR,
  lightwellCtaStyle,
  nudgeModeStyles,
} from './nudgeStyles';
import { ProductNudgeBrandLogo } from './ProductNudgeBrandLogo';
import { lightwellBrandAssets } from './productNudgeDefaults';
import {
  ProductNudgeBrand,
  ProductNudgeVariant,
  ProductNudgeBehavior,
  NudgeContent,
  NudgeMetric,
  ProductNudgeCtaColorScheme,
  ProductNudgeHeadingLevel,
} from './ProductNudge.types';

export interface ProductNudgeProps {
  /** Visual layout variant */
  variant: ProductNudgeVariant;
  /** Interaction behavior; defaults to 'persistent' */
  behavior?: ProductNudgeBehavior;
  /** All displayable content */
  content: NudgeContent;
  /** Metrics displayed in a row below the body text */
  metrics?: NudgeMetric[];
  /** false renders null and suppresses impression tracking */
  isEligible: boolean;
  /** Shows a loading spinner and disables a non-link CTA while its action is in progress. */
  isLoading?: boolean;
  /** Called when a non-link (contact) CTA is clicked. Not needed when `content.cta.action` is `'link'`. A contact CTA is not rendered without it. */
  onAction?: () => void;
  /** Called when the user dismisses (behavior='dismissible') */
  onDismiss?: () => void;
  /** Called once when the component is 50% visible in the viewport */
  onImpression?: () => void;
  /** Applies a named brand preset; copy remains entirely caller-supplied. */
  brand?: ProductNudgeBrand;
  /** CTA color scheme; defaults to the selected brand or PatternFly styling. */
  ctaColorScheme?: ProductNudgeCtaColorScheme;
  /** CTA inline style applied when `ctaColorScheme="custom"`. */
  ctaStyle?: React.CSSProperties;
  /** Heading level for the headline; defaults to the existing level for the selected variant. */
  headingLevel?: ProductNudgeHeadingLevel;
  /** Size of the headline; defaults to '2xl' for `full-width`, 'lg' otherwise. Set this to keep the headline visually consistent with a non-default `headingLevel`. */
  headingSize?: TitleProps['size'];
  /** Width of the full logo (hero/alert); defaults to '6rem'. */
  logoSize?: string;
  /** Inline-start margin of the full logo, used to compensate for an asset's internal padding; defaults to '-10px' for the Lightwell logo, '0' for a caller-supplied logo. */
  logoOffset?: string;
  /** Width/height of the small logo mark (alert icon); defaults to '1.75rem'. */
  logoMarkSize?: string;
  /** Inline-start margin of the small logo mark; defaults to '-3px' for the Lightwell mark, '0' for a caller-supplied mark. */
  logoMarkOffset?: string;
  /** Hero background color; defaults to the Lightwell tint when `brand="lightwell"`, otherwise unset. */
  backgroundColor?: string;
  /** Additional CSS class forwarded to the root element */
  className?: string;
  /** OUIA component ID */
  ouiaId?: string;
  /** Prefix used in the dismiss button's aria-label, followed by the headline. */
  dismissAriaLabelPrefix?: string;
  /** Tooltip content shown on the dismiss button; defaults to the same text as the dismiss aria-label. */
  dismissTooltipContent?: ReactNode;
  /** Text for the "show less" toggle when `behavior="collapsible"`. */
  showLessText?: string;
  /** Prefix used in the alert's expand/collapse toggle aria-label, followed by the headline. */
  showDetailsAriaLabelPrefix?: string;
}

const useStyles = createUseStyles({
  nudge: {
    padding: 'var(--pf-t--global--spacer--lg)',
  },
  alertIcon: {
    display: 'block',
  },
  logo: {
    display: 'block',
  },
  ...nudgeModeStyles,
  heroBg: {
    '--pf-v6-c-hero--BackgroundColor': 'var(--pn-nudge-background-color)',
    '.pf-v6-theme-dark &': {
      '--pf-v6-c-hero--BackgroundColor': 'var(--pf-t--color--black)',
    },
  },
  heroContent: {
    maxWidth: '75%',
  },
  heroDismiss: {
    position: 'absolute',
    insetBlockStart: 'var(--pf-t--global--spacer--md)',
    insetInlineEnd: 'var(--pf-t--global--spacer--md)',
  },
  disclosure: {
    display: 'block',
    marginBlockStart: 'var(--pf-t--global--spacer--xs)',
  },
  metricsRow: {
    alignItems: 'flex-start',
  },
});

const formatMetricValue = (value: string | number, format: 'percentage' | 'count' | 'text') => {
  if (format === 'percentage') {
    return `${value}%`;
  }
  return value;
};

const ProductNudgeContent: FunctionComponent<ProductNudgeProps> = ({
  variant,
  behavior = 'persistent',
  content,
  metrics = [],
  isEligible,
  isLoading = false,
  onAction,
  onDismiss,
  onImpression,
  ctaColorScheme,
  ctaStyle: customCtaStyle,
  headingLevel,
  headingSize,
  logoSize,
  logoOffset,
  logoMarkSize,
  logoMarkOffset,
  backgroundColor,
  brand,
  className,
  ouiaId = 'ProductNudge',
  dismissAriaLabelPrefix = 'Dismiss ',
  dismissTooltipContent,
  showLessText = 'Show less',
  showDetailsAriaLabelPrefix = 'Show details for ',
}: ProductNudgeProps) => {
  const classes = useStyles();
  const [ isDismissed, setIsDismissed ] = useState(false);
  const [ isExpanded, setIsExpanded ] = useState(false);
  const impressionRef = useImpressionTracking(onImpression, isEligible && !isLoading);

  if (!isEligible || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const assets = {
    ...(brand === 'lightwell' ? lightwellBrandAssets : {}),
    ...content.assets,
  };
  const hasCustomLogo = Boolean(content.assets?.logo);
  const resolvedLogoStyle = createImageSizeStyle(
    logoSize ?? '6rem',
    logoOffset ?? (hasCustomLogo ? '0' : '-10px'),
  );
  const hasCustomLogoMark = Boolean(content.assets?.logo || content.assets?.logomark);
  const resolvedLogoMarkStyle = createSquareImageSizeStyle(
    logoMarkSize ?? '1.75rem',
    logoMarkOffset ?? (hasCustomLogoMark ? '0' : '-3px'),
  );
  const resolvedBackgroundColor = backgroundColor ?? (brand === 'lightwell' ? LIGHTWELL_BACKGROUND_COLOR : undefined);
  const ctaHref = content.cta.action === 'link' ? content.cta.href : undefined;
  const resolvedCtaColorScheme = ctaColorScheme ?? (brand === 'lightwell' ? 'lightwell' : 'default');
  const ctaStyleByScheme: Record<ProductNudgeCtaColorScheme, React.CSSProperties | undefined> = {
    lightwell: lightwellCtaStyle,
    custom: customCtaStyle,
    default: undefined,
  };
  const ctaStyle = ctaStyleByScheme[resolvedCtaColorScheme];

  const metricsRow = metrics.length > 0 && (
    <Flex
      spaceItems={{ default: 'spaceItemsLg' }}
      className={classes.metricsRow}
      data-ouia-component-id={`${ouiaId}-metrics`}
    >
      {metrics.map((metric) => (
        <FlexItem key={metric.label}>
          <Content component="p">
            <strong>{formatMetricValue(metric.value, metric.format)}</strong> {metric.label}
          </Content>
        </FlexItem>
      ))}
    </Flex>
  );

  const dismissControl = behavior === 'dismissible' && (
    <Tooltip
      content={dismissTooltipContent ?? `${dismissAriaLabelPrefix}${content.headline}`}
      // The default tooltip repeats the button's aria-label, so don't announce it twice.
      aria={dismissTooltipContent ? 'describedby' : 'none'}
    >
      <Button
        variant="plain"
        aria-label={`${dismissAriaLabelPrefix}${content.headline}`}
        onClick={handleDismiss}
        icon={<TimesIcon />}
        ouiaId={`${ouiaId}-dismiss`}
      />
    </Tooltip>
  );

  const sharedCtaProps = {
    variant: 'primary' as const,
    size: variant === 'full-width' ? ('lg' as const) : undefined,
    ouiaId: `${ouiaId}-cta`,
    style: ctaStyle,
  };

  // A contact CTA needs an `onAction` handler; without one there is nothing for the button to do.
  const showCta = content.cta.action === 'link' || Boolean(onAction);

  const renderCtaButton = () => {
    if (!showCta) {
      return null;
    }
    if (content.cta.action === 'link') {
      return (
        <Button
          {...sharedCtaProps}
          component="a"
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.cta.label}
        </Button>
      );
    }
    return (
      <Button
        {...sharedCtaProps}
        onClick={onAction}
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        {content.cta.label}
      </Button>
    );
  };
  const ctaButton = renderCtaButton();

  const hasPartnerLogo = Boolean(assets.partnerLogo || assets.partnerLogoDark);
  const cta = (
    <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsMd' }}>
      {ctaButton && <FlexItem>{ctaButton}</FlexItem>}
      {hasPartnerLogo && (
        <FlexItem>
          <ProductNudgeBrandLogo light={assets.partnerLogo} dark={assets.partnerLogoDark} />
        </FlexItem>
      )}
    </Flex>
  );

  const body = (
    <Stack hasGutter>
      {assets.logo && (
        <StackItem>
          <img
            className={css(classes.logo, assets.logoDark ? classes.lightModeOnly : undefined)}
            style={resolvedLogoStyle}
            src={assets.logo.src}
            alt={assets.logo.alt}
          />
          {assets.logoDark && (
            <img
              className={css(classes.logo, classes.darkModeOnly)}
              style={resolvedLogoStyle}
              src={assets.logoDark.src}
              alt={assets.logoDark.alt}
            />
          )}
        </StackItem>
      )}
      <StackItem>
        <Title
          headingLevel={headingLevel ?? (variant === 'full-width' ? 'h1' : 'h2')}
          size={headingSize ?? (variant === 'full-width' ? '2xl' : 'lg')}
          data-ouia-component-id={`${ouiaId}-title`}
        >
          {content.headline}
        </Title>
      </StackItem>
      <StackItem>
        <Content component="p" data-ouia-component-id={`${ouiaId}-body`}>
          {content.body}
        </Content>
        {content.secondaryBody && <Content component="p">{content.secondaryBody}</Content>}
        {content.disclosure && (
          <Content component="small" className={classes.disclosure}>
            {content.disclosure}
          </Content>
        )}
      </StackItem>
      {metricsRow && <StackItem>{metricsRow}</StackItem>}
      {(showCta || hasPartnerLogo) && <StackItem>{cta}</StackItem>}
    </Stack>
  );

  const nudgePaddingClass = variant === 'full-width' || variant === 'inline' ? undefined : classes.nudge;

  const rootClassName = css(
    'pf-v6-product-nudge',
    `pf-v6-product-nudge--${variant}`,
    nudgePaddingClass,
    className,
  );

  const withExpandableContent = (children: React.ReactNode) => behavior === 'collapsible' ? (
    <ExpandableSection
      toggleText={isExpanded ? showLessText : content.headline}
      onToggle={(_event, expanded) => setIsExpanded(expanded)}
      isExpanded={isExpanded}
    >
      {children}
    </ExpandableSection>
  ) : children;

  if (variant === 'full-width') {
    return (
      <div ref={impressionRef}>
        <Hero
          className={css(rootClassName, resolvedBackgroundColor ? classes.heroBg : undefined)}
          data-ouia-component-id={ouiaId}
          style={{
            position: 'relative',
            '--pf-v6-c-hero--BorderBlockStartWidth': '0',
            '--pf-v6-c-hero--BorderBlockEndWidth': '0',
            '--pf-v6-c-hero--BorderInlineStartWidth': '0',
            '--pf-v6-c-hero--BorderInlineEndWidth': '0',
            '--pf-v6-c-hero--PaddingBlockStart': 'calc(2 * var(--pf-t--global--spacer--xl))',
            '--pf-v6-c-hero--PaddingBlockEnd': 'calc(2 * var(--pf-t--global--spacer--xl))',
            '--pf-v6-c-hero--PaddingInlineStart': 'calc(2 * var(--pf-t--global--spacer--xl))',
            ...(resolvedBackgroundColor && {
              '--pn-nudge-background-color': resolvedBackgroundColor,
            }),
            ...(assets.backgroundImageLight && {
              '--pf-v6-c-hero--BackgroundImage--light': `url(${assets.backgroundImageLight})`,
            }),
            ...(assets.backgroundImageDark && {
              '--pf-v6-c-hero--BackgroundImage--dark': `url(${assets.backgroundImageDark})`,
            }),
          } as React.CSSProperties}
        >
          {dismissControl && (
            <div className={classes.heroDismiss}>{dismissControl}</div>
          )}
          <div className={classes.heroContent}>{withExpandableContent(body)}</div>
        </Hero>
      </div>
    );
  }

  if (variant === 'inline') {
    const alertIconImage = content.assets?.logo ?? assets.logomark ?? assets.logo;
    const alertIconDark = content.assets?.logoDark ?? assets.logomarkDark ?? assets.logoDark;
    const alertIcon = content.icon ?? (alertIconImage ? (
      <>
        <img
          className={css(classes.alertIcon, alertIconDark ? classes.lightModeOnly : undefined)}
          style={resolvedLogoMarkStyle}
          src={alertIconImage.src}
          alt=""
        />
        {alertIconDark && (
          <img
            className={css(classes.alertIcon, classes.darkModeOnly)}
            style={resolvedLogoMarkStyle}
            src={alertIconDark.src}
            alt=""
          />
        )}
      </>
    ) : undefined);

    const renderAlertCta = () => {
      if (!showCta) {
        return undefined;
      }
      if (content.cta.action === 'link') {
        return (
          <AlertActionLink
            component="a"
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            ouiaId={`${ouiaId}-cta`}
          >
            {content.cta.label}
          </AlertActionLink>
        );
      }
      return (
        <AlertActionLink onClick={onAction} ouiaId={`${ouiaId}-cta`}>
          {content.cta.label}
        </AlertActionLink>
      );
    };
    const alertCta = renderAlertCta();

    return (
      <div ref={impressionRef} className={rootClassName} data-ouia-component-id={ouiaId}>
        <Alert
          variant={content.alertVariant ?? 'info'}
          isInline
          component={headingLevel ?? 'h4'}
          isExpandable={behavior === 'collapsible'}
          toggleAriaLabel={`${showDetailsAriaLabelPrefix}${content.headline}`}
          title={content.headline}
          customIcon={alertIcon}
          actionClose={dismissControl || undefined}
          actionLinks={alertCta}
          ouiaId={`${ouiaId}-alert`}
        >
          {content.body}
          {content.secondaryBody && <Content component="p">{content.secondaryBody}</Content>}
          {content.disclosure && <Content component="small">{content.disclosure}</Content>}
        </Alert>
      </div>
    );
  }

  if (variant === 'compact') {
    const fieldValue = metrics[0]
      ? `${formatMetricValue(metrics[0].value, metrics[0].format)} ${metrics[0].label}`
      : undefined;
    const fieldContent = (
      <ProductNudgeStack
        isEligible={isEligible}
        brand={brand}
        titleText={content.headline}
        titleIcon={content.icon}
        bodyText={content.body}
        ctaText={content.cta.label}
        ctaUrl={ctaHref}
        onAction={content.cta.action === 'contact' ? onAction : undefined}
        isLoading={isLoading}
        logo={content.assets?.logomark ?? content.assets?.logo ?? assets.logomark ?? assets.logo}
        logoDark={content.assets?.logomarkDark ?? content.assets?.logoDark ?? assets.logomarkDark ?? assets.logoDark}
        logoMarkSize={logoMarkSize}
        logoMarkOffset={logoMarkOffset}
        value={fieldValue}
        ouiaId={`${ouiaId}-field`}
      />
    );

    return (
      <div ref={impressionRef} className={rootClassName} data-ouia-component-id={ouiaId}>
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
          <FlexItem flex={{ default: 'flex_1' }}>{withExpandableContent(fieldContent)}</FlexItem>
          {dismissControl && <FlexItem>{dismissControl}</FlexItem>}
        </Flex>
      </div>
    );
  }

  return null;
};

const ProductNudge: FunctionComponent<ProductNudgeProps> = (props: ProductNudgeProps) => (
  <ErrorBoundary silent>
    <ProductNudgeContent {...props} />
  </ErrorBoundary>
);

export default ProductNudge;

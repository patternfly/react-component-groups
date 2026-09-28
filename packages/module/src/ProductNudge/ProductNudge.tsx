import type { FunctionComponent } from 'react';
import { useState } from 'react';

import {
  Alert,
  AlertActionCloseButton,
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
} from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon.js';
import { createUseStyles } from 'react-jss';

import ErrorBoundary from '../ErrorBoundary';
import { useImpressionTracking } from './useImpressionTracking';
import { ProductNudgeField } from './ProductNudgeField';
import { lightwellBackgroundStyle, lightwellCtaStyle, nudgeModeStyles } from './nudgeStyles';
import { ProductNudgeBrandLockup } from './ProductNudgeBrandLockup';
import { lightwellBrandAssets } from './productNudgeDefaults';
import {
  ProductNudgeBrand,
  ProductNudgeProminence,
  ProductNudgeBehavior,
  NudgeContent,
  NudgeMetric,
  ProductNudgeCtaColorScheme,
} from './ProductNudge.types';

export interface ProductNudgeProps {
  /** Visual layout variant */
  prominence: ProductNudgeProminence;
  /** Interaction behavior; defaults to 'persistent' */
  behavior?: ProductNudgeBehavior;
  /** All displayable content */
  content: NudgeContent;
  /** Metrics displayed in a row below the body text */
  metrics?: NudgeMetric[];
  /** false renders null and suppresses impression tracking */
  isEligible: boolean;
  /** Shows a loading spinner on the CTA and disables it */
  isLoading?: boolean;
  /** Called when a non-link CTA is clicked */
  onAction: () => void;
  /** Called when the user dismisses (behavior='dismissible') */
  onDismiss?: () => void;
  /** Called once when the component is 50% visible in the viewport */
  onImpression?: () => void;
  /** Applies a named brand preset; copy remains entirely caller-supplied. */
  brand?: ProductNudgeBrand;
  /** CTA color scheme; defaults to the selected brand or PatternFly styling. */
  ctaColorScheme?: ProductNudgeCtaColorScheme;
  /** Additional CSS class forwarded to the root element */
  className?: string;
  /** OUIA component ID */
  ouiaId?: string;
}

const useStyles = createUseStyles({
  nudge: {
    padding: 'var(--pf-t--global--spacer--lg)',
  },
  alertIcon: {
    display: 'block',
    width: '1.5rem',
    height: 'auto',
    marginInlineStart: '-3px',
  },
  logo: {
    display: 'block',
    width: '6rem',
    marginInlineStart: '-10px',
  },
  ...nudgeModeStyles,
  heroBg: {
    ...lightwellBackgroundStyle,
    '--pf-v6-c-hero--BackgroundColor': 'var(--lightwell--background-color)',
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
  prominence,
  behavior = 'persistent',
  content,
  metrics = [],
  isEligible,
  isLoading = false,
  onAction,
  onDismiss,
  onImpression,
  ctaColorScheme,
  brand,
  className,
  ouiaId = 'ProductNudge',
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
  const ctaStyle = (ctaColorScheme ?? (brand === 'lightwell' ? 'lightwell' : 'default')) === 'lightwell'
    ? lightwellCtaStyle
    : undefined;

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
    <Button
      variant="plain"
      aria-label={`Dismiss ${content.headline}`}
      onClick={handleDismiss}
      icon={<TimesIcon />}
      ouiaId={`${ouiaId}-dismiss`}
    />
  );

  const ctaButton =
    content.cta.action === 'link' && content.cta.href ? (
      <Button
        component="a"
        href={content.cta.href}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        size={prominence === 'hero' ? 'lg' : undefined}
        ouiaId={`${ouiaId}-cta`}
        style={ctaStyle}
      >
        {content.cta.label}
      </Button>
    ) : (
      <Button
        variant="primary"
        size={prominence === 'hero' ? 'lg' : undefined}
        onClick={onAction}
        isLoading={isLoading}
        isDisabled={isLoading}
        ouiaId={`${ouiaId}-cta`}
        style={ctaStyle}
      >
        {content.cta.label}
      </Button>
    );

  const cta = (
    <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsMd' }}>
      <FlexItem>{ctaButton}</FlexItem>
      {(assets.partnerLockup || assets.partnerLockupDark) && (
        <FlexItem>
          <ProductNudgeBrandLockup light={assets.partnerLockup} dark={assets.partnerLockupDark} />
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
            src={assets.logo.src}
            alt={assets.logo.alt}
          />
          {assets.logoDark && (
            <img
              className={css(classes.logo, classes.darkModeOnly)}
              src={assets.logoDark.src}
              alt={assets.logoDark.alt}
            />
          )}
        </StackItem>
      )}
      <StackItem>
        <Title
          headingLevel={prominence === 'hero' ? 'h1' : 'h2'}
          size={prominence === 'hero' ? '2xl' : 'lg'}
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
      <StackItem>{cta}</StackItem>
    </Stack>
  );

  const nudgePaddingClass = prominence === 'hero' || prominence === 'alert' ? undefined : classes.nudge;

  const rootClassName = css(
    'pf-v6-product-nudge',
    `pf-v6-product-nudge--${prominence}`,
    nudgePaddingClass,
    className,
  );

  if (behavior === 'collapsible') {
    return (
      <div ref={impressionRef} className={rootClassName} data-ouia-component-id={ouiaId}>
        <ExpandableSection
          toggleText={isExpanded ? 'Show less' : content.headline}
          onToggle={(_event, expanded) => setIsExpanded(expanded)}
          isExpanded={isExpanded}
        >
          {body}
        </ExpandableSection>
      </div>
    );
  }

  if (prominence === 'hero') {
    return (
      <div ref={impressionRef}>
        <Hero
          className={css(rootClassName, brand === 'lightwell' ? classes.heroBg : undefined)}
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
            ...(assets.backgroundImageLight && {
              '--pf-v6-c-hero--BackgroundImage--light': `url(${assets.backgroundImageLight})`,
            }),
            ...(assets.backgroundImageDark && {
              '--pf-v6-c-hero--BackgroundImage--dark': `url(${assets.backgroundImageDark})`,
            }),
          } as React.CSSProperties}
        >
          <FlexItem className={classes.heroContent}>{body}</FlexItem>
          {dismissControl && (
            <div className={classes.heroDismiss}>{dismissControl}</div>
          )}
        </Hero>
      </div>
    );
  }

  if (prominence === 'alert') {
    const alertIconImage = content.assets?.logo ?? assets.logomark ?? assets.logo;
    const alertIconDark = content.assets?.logoDark ?? assets.logomarkDark ?? assets.logoDark;
    const alertIcon = content.icon ?? (alertIconImage ? (
      <>
        <img
          className={css(classes.alertIcon, alertIconDark ? classes.lightModeOnly : undefined)}
          src={alertIconImage.src}
          alt=""
          aria-hidden
        />
        {alertIconDark && (
          <img
            className={css(classes.alertIcon, classes.darkModeOnly)}
            src={alertIconDark.src}
            alt=""
            aria-hidden
          />
        )}
      </>
    ) : undefined);

    const alertCta =
      content.cta.action === 'link' && content.cta.href ? (
        <AlertActionLink
          component="a"
          href={content.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          ouiaId={`${ouiaId}-cta`}
        >
          {content.cta.label}
        </AlertActionLink>
      ) : (
        <AlertActionLink onClick={onAction} ouiaId={`${ouiaId}-cta`}>
          {content.cta.label}
        </AlertActionLink>
      );

    return (
      <div ref={impressionRef} className={className} data-ouia-component-id={ouiaId}>
        <Alert
          variant={content.alertVariant ?? 'info'}
          isInline
          title={content.headline}
          customIcon={alertIcon}
          actionClose={behavior === 'dismissible' ? (
            <AlertActionCloseButton
              title={content.headline}
              onClose={handleDismiss}
              ouiaId={`${ouiaId}-dismiss`}
            />
          ) : undefined}
          actionLinks={alertCta}
          ouiaId={`${ouiaId}-alert`}
        >
          {content.body}
        </Alert>
      </div>
    );
  }

  if (prominence === 'field') {
    const fieldValue = metrics[0]
      ? String(formatMetricValue(metrics[0].value, metrics[0].format))
      : undefined;
    return (
      <div ref={impressionRef} data-ouia-component-id={ouiaId}>
        <ProductNudgeField
          isEligible={isEligible}
          brand={brand}
          titleText={content.headline}
          titleIcon={content.icon}
          bodyText={content.body}
          ctaText={content.cta.label}
          ctaUrl={content.cta.href}
          logo={content.assets?.logomark ?? content.assets?.logo ?? assets.logomark ?? assets.logo}
          logoDark={content.assets?.logomarkDark ?? content.assets?.logoDark ?? assets.logomarkDark ?? assets.logoDark}
          value={fieldValue}
          ouiaId={`${ouiaId}-field`}
          className={className}
        />
      </div>
    );
  }

  return (
    <div ref={impressionRef} className={rootClassName} data-ouia-component-id={ouiaId}>
      <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
        <FlexItem>{body}</FlexItem>
        <FlexItem>{dismissControl}</FlexItem>
      </Flex>
    </div>
  );
};

const ProductNudge: FunctionComponent<ProductNudgeProps> = (props: ProductNudgeProps) => (
  <ErrorBoundary silent>
    <ProductNudgeContent {...props} />
  </ErrorBoundary>
);

export default ProductNudge;

import { FunctionComponent, useState } from 'react';

import {
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
import {
  ProductNudgeProps,
  ProductNudgeProminence,
  ProductNudgeBehavior,
  NudgeContent,
  NudgeMetric,
  ProductNudgeCtaColorScheme,
} from './ProductNudge.types';

const useStyles = createUseStyles({
  nudge: {
    padding: 'var(--pf-t--global--spacer--lg)',
  },
  nudgeBannerInline: {
    padding: 'var(--pf-t--global--spacer--md)',
  },
  nudgeCompact: {
    padding: 'var(--pf-t--global--spacer--sm)',
  },
  logo: {
    display: 'block',
    maxWidth: '10rem',
    width: '100%',
  },
  partnerLockup: {
    display: 'block',
    height: '1rem',
    width: 'auto',
  },
  heroContent: {
    maxWidth: '50%',
  },
  disclosure: {
    display: 'block',
    marginBlockStart: 'var(--pf-t--global--spacer--xs)',
  },
  metricsRow: {
    alignItems: 'flex-start',
  },
  ctaLightwellColor: {
    '--pf-t--global--color--brand--accent--default': 'var(--pf-t--color--red--50)',
    '--pf-t--global--color--brand--accent--hover': 'var(--pf-t--color--red--60)',
    '--pf-t--global--color--brand--accent--clicked': 'var(--pf-t--color--red--60)',
  },
});

const formatMetricValue = (value: string | number, format: 'percentage' | 'count' | 'text') => {
  if (format === 'percentage') {
    return `${value}%`;
  }
  return value;
};

interface ProductNudgeContentProps {
  prominence: ProductNudgeProminence;
  behavior?: ProductNudgeBehavior;
  content: NudgeContent;
  metrics?: NudgeMetric[];
  isEligible: boolean;
  isLoading?: boolean;
  onAction: () => void;
  onDismiss?: () => void;
  onImpression?: () => void;
  ctaColorScheme?: ProductNudgeCtaColorScheme;
  className?: string;
  ouiaId?: string;
}

const ProductNudgeContent: FunctionComponent<ProductNudgeContentProps> = ({
  prominence,
  behavior = 'persistent',
  content,
  metrics = [],
  isEligible,
  isLoading = false,
  onAction,
  onDismiss,
  onImpression,
  ctaColorScheme = 'lightwell',
  className,
  ouiaId = 'ProductNudge',
}) => {
  const classes = useStyles();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const impressionRef = useImpressionTracking(onImpression, isEligible && !isLoading);

  if (!isEligible || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const ctaStyle = ctaColorScheme === 'lightwell' ? { style: { '--pf-t--global--color--brand--accent--default': 'var(--pf-t--color--red--50)', '--pf-t--global--color--brand--accent--hover': 'var(--pf-t--color--red--60)', '--pf-t--global--color--brand--accent--clicked': 'var(--pf-t--color--red--60)' } as React.CSSProperties } : {};

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
        {...ctaStyle}
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
        {...ctaStyle}
      >
        {content.cta.label}
      </Button>
    );

  const cta = (
    <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsMd' }}>
      <FlexItem>{ctaButton}</FlexItem>
      {content.assets?.partnerLockup && (
        <FlexItem>
          <img
            className={classes.partnerLockup}
            src={content.assets.partnerLockup.src}
            alt={content.assets.partnerLockup.alt}
          />
        </FlexItem>
      )}
    </Flex>
  );

  const body = (
    <Stack hasGutter>
      {content.assets?.logo && (
        <StackItem>
          <img
            className={classes.logo}
            src={content.assets.logo.src}
            alt={content.assets.logo.alt}
          />
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

  const nudgePaddingClass =
    prominence === 'banner' || prominence === 'inline'
      ? classes.nudgeBannerInline
      : prominence === 'compact'
        ? classes.nudgeCompact
        : classes.nudge;

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
          className={rootClassName}
          data-ouia-component-id={ouiaId}
          style={{
            border: 'none',
            ...(content.assets?.backgroundImage && {
              backgroundImage: `url(${content.assets.backgroundImage})`,
            }),
          }}
        >
          <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
            <FlexItem className={classes.heroContent}>{body}</FlexItem>
            <FlexItem>{dismissControl}</FlexItem>
          </Flex>
        </Hero>
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

export const ProductNudge: FunctionComponent<ProductNudgeProps> = (props) => (
  <ErrorBoundary silent>
    <ProductNudgeContent {...props} />
  </ErrorBoundary>
);

export default ProductNudge;

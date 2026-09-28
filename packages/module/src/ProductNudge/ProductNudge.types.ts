import React from 'react';

export type ProductNudgeBrand = 'lightwell';

export interface ProductNudgeImage {
  src: string;
  alt: string;
}

/** Brand images that can be applied by a named brand preset or overridden by consumers. */
export interface ProductNudgeBrandAssets {
  logo?: ProductNudgeImage;
  logoDark?: ProductNudgeImage;
  logomark?: ProductNudgeImage;
  logomarkDark?: ProductNudgeImage;
  backgroundImageLight?: string;
  backgroundImageDark?: string;
  partnerLockup?: ProductNudgeImage;
  partnerLockupDark?: ProductNudgeImage;
}

export interface NudgeContact {
  /** Modal title text (used for aria-label) */
  title: string;
  /** Introductory paragraph shown above the form */
  intro: string | React.ReactNode;
  /** Message shown in place of the form after a successful submit */
  successMessage: string | React.ReactNode;
}

export interface NudgeContent {
  /** Unique content identifier, e.g. 'product.overview' */
  id: string;
  /** Primary heading text */
  headline: string;
  /** Primary body paragraph */
  body: string | React.ReactNode;
  /** Optional secondary body paragraph */
  secondaryBody?: string | React.ReactNode;
  /** Optional hedged legal/disclaimer text rendered in a small element */
  disclosure?: string | React.ReactNode;
  /** Call-to-action configuration */
  cta: {
    /** Button label */
    label: string;
    /** 'link' renders an anchor to href; 'contact' fires onAction */
    action: 'contact' | 'link';
    /** Required when action is 'link' */
    href?: string;
  };
  /** Contact modal content; required when cta.action is 'contact' */
  contact?: NudgeContact;
  /** Optional React icon rendered for icon-bearing prominence modes. */
  icon?: React.ReactNode;
  /** Visual severity when prominence is `alert`; defaults to `info`. */
  alertVariant?: 'success' | 'warning' | 'danger' | 'info';
  /** Optional brand imagery */
  assets?: ProductNudgeBrandAssets;
}

/** Format applied to a metric value for display */
export type NudgeMetricFormat = 'percentage' | 'count' | 'text';

export interface NudgeMetric {
  /** Display label, e.g. 'covered packages' */
  label: string;
  /** Numeric or string value */
  value: string | number;
  /** How to format the value for display */
  format: NudgeMetricFormat;

}

/** Visual weight / layout variant */
export type ProductNudgeProminence = 'hero' | 'alert' | 'field';

/** Interaction pattern */
export type ProductNudgeBehavior = 'persistent' | 'dismissible' | 'collapsible';

/** CTA color scheme; 'lightwell' applies the Lightwell red accent, 'default' uses PatternFly styling. */
export type ProductNudgeCtaColorScheme = 'lightwell' | 'default';

export interface ProductNudgeAction {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface ProductNudgeContactFormField {
  /** Stable key used in the submitted values object. */
  name: string;
  /** Accessible field label. */
  label: React.ReactNode;
  /** Native input type. */
  type?: 'text' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'time' | 'url';
  placeholder?: string;
  isRequired?: boolean;
  autoComplete?: string;
  helpText?: React.ReactNode;
}

export type ContactFormValues = Record<string, string>;

export interface ProductNudgeContactModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Modal title */
  titleText: React.ReactNode;
  /** Optional icon or component shown beside the modal title */
  titleIcon?: React.ComponentType;
  /** Optional icon node shown beside the modal title; takes precedence over titleIcon. */
  headerIcon?: React.ReactNode;
  /** Optional description shown below the modal title */
  descriptionText?: React.ReactNode;
  /** Submit button label */
  submitText: React.ReactNode;
  /** Placeholder for the name field */
  namePlaceholder?: string;
  /** Placeholder for the email field */
  emailPlaceholder?: string;
  /** Placeholder for the phone field */
  phonePlaceholder?: string;
  /** Configurable fields. Defaults to the legacy name, email, and phone fields. */
  fields?: ProductNudgeContactFormField[];
  /** Optional message displayed after a successful submission. */
  successMessage?: React.ReactNode;
  /** Receives values keyed by each configured field's name. */
  onSubmit: (values: ContactFormValues) => Promise<void>;
  /** Applies a named brand preset; copy remains entirely caller-supplied. */
  brand?: ProductNudgeBrand;
  /** Footer partner lockup override. */
  partnerLockup?: ProductNudgeImage;
  /** Dark-mode footer partner lockup override. */
  partnerLockupDark?: ProductNudgeImage;
  /** Override the primary CTA visual scheme. */
  ctaColorScheme?: ProductNudgeCtaColorScheme;
  /** Prefix for generated form and accessibility IDs. */
  id?: string;
}

export interface ProductNudgeMatchData {
  exact: number;
  partial: number;
  noMatch: number;
}

export interface ProductNudgeEcosystemData extends ProductNudgeMatchData {
  name: string | React.ReactNode;
}

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

export interface ProductNudgeFieldProps {
  /** false renders null */
  isEligible: boolean;
  /** Applies a named brand preset; copy remains entirely caller-supplied. */
  brand?: ProductNudgeBrand;
  /** Icon shown beside the title. */
  titleIcon?: React.ReactNode;
  /** Heading label rendered beside the logo */
  titleText: string | React.ReactNode;
  /** Primary value or metric rendered below the heading */
  value?: string | React.ReactNode;
  /** Body / note text */
  bodyText: string | React.ReactNode;
  /** CTA link label */
  ctaText?: string;
  /** CTA link href */
  ctaUrl?: string;
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

export interface ProductNudgeDescriptionItemProps {
  /** false renders null */
  isEligible: boolean;
  /** Applies a named brand preset; copy remains entirely caller-supplied. */
  brand?: ProductNudgeBrand;
  /** Visible text/content rendered in the description-list term. */
  termText?: string | React.ReactNode;
  /** Icon displayed in the description-list term. */
  termIcon?: React.ReactNode;
  /** Bold headline in the description */
  headline: string | React.ReactNode;
  /** Body paragraph in the description */
  bodyText: string | React.ReactNode;
  /** CTA link label */
  ctaText?: string;
  /** CTA link href */
  ctaUrl?: string;
  /** Custom term logo/icon image for light mode. */
  logo?: { src: string; alt: string };
  /** Custom term logo/icon image for dark mode. */
  logoDark?: { src: string; alt: string };
  /** OUIA component ID */
  ouiaId?: string;
  /** Additional CSS class on the DescriptionListGroup */
  className?: string;
  /** data-testid forwarded to root */
  'data-testid'?: string;
}

export interface ProductNudgeMatchAnalysisModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Summary counts for the built-in match charts; omitted when using custom analysis content. */
  matchData?: ProductNudgeMatchData;
  /** Per-ecosystem counts for the built-in charts; omitted when using custom analysis content. */
  ecosystemData?: ProductNudgeEcosystemData[];
  /** Applies a named brand preset; all copy remains caller-supplied. */
  brand?: ProductNudgeBrand;
  titleText: React.ReactNode;
  titleIcon?: React.ReactNode;
  descriptionText?: React.ReactNode;
  /** Replaces the default chart analysis region with caller-provided content. */
  analysisContent?: React.ReactNode;
  footerText?: React.ReactNode;
  primaryAction?: ProductNudgeAction;
  secondaryAction?: ProductNudgeAction;
  partnerLockup?: ProductNudgeImage;
  partnerLockupDark?: ProductNudgeImage;
  ctaColorScheme?: ProductNudgeCtaColorScheme;
  /** Optional palette for the built-in charts. */
  chartColors?: string[];
  /** Prefix for generated modal and accessibility IDs. */
  id?: string;
}

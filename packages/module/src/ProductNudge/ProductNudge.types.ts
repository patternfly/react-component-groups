import React from 'react';

export interface NudgeContact {
  /** Modal title text (used for aria-label) */
  title: string;
  /** Introductory paragraph shown above the form */
  intro: string | React.ReactNode;
  /** Message shown in place of the form after a successful submit */
  successMessage: string | React.ReactNode;
}

export interface NudgeContent {
  /** Unique content identifier, e.g. 'lightwell.ocm.overview' */
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
  /** Optional brand imagery */
  assets?: {
    /** Logo rendered above the headline (light mode) */
    logo?: { src: string; alt: string };
    /** Logo rendered above the headline in dark mode */
    logoDark?: { src: string; alt: string };
    /** CSS url() value for the hero background (light mode) */
    backgroundImageLight?: string;
    /** CSS url() value for the hero background (dark mode) */
    backgroundImageDark?: string;
    /** Rendered beside the CTA button (light mode) */
    partnerLockup?: { src: string; alt: string };
    /** Rendered beside the CTA button in dark mode */
    partnerLockupDark?: { src: string; alt: string };
  };
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

/** CTA color scheme; 'lightwell' applies the Red Hat red accent, 'default' uses standard PF blue */
export type ProductNudgeCtaColorScheme = 'lightwell' | 'default';

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
}

export interface ProductNudgeContactModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Contact modal content (title, intro, successMessage) */
  content: NudgeContact;
  /** Pre-filled name value */
  prefillName?: string;
  /** Pre-filled email value */
  prefillEmail?: string;
  /** Transport handler; resolves on success, rejects on failure */
  onSubmit: (values: ContactFormValues) => Promise<void>;
  /** Logo + wordmark shown at the top-left of the modal (light mode) */
  headerLogo?: { src: string; alt: string; name?: string };
  /** Logo shown in dark mode (wordmark text unchanged) */
  headerLogoDark?: { src: string; alt: string };
  /** Background image URL for the right decorative panel (light mode) */
  backgroundImage?: string;
  /** Background image URL used when .pf-v6-theme-dark is on the root element */
  backgroundImageDark?: string;
  /** Inline logo lockup rendered beside the submit button (light mode) */
  partnerLogos?: React.ReactNode;
  /** Inline logo lockup rendered in dark mode */
  partnerLogosDark?: React.ReactNode;
  /** Mark the name field as required; defaults to true */
  isNameRequired?: boolean;
  /** Mark the email field as required; defaults to true */
  isEmailRequired?: boolean;
  /** Mark the phone field as required; defaults to false */
  isPhoneRequired?: boolean;
  /** Additional CSS class */
  className?: string;
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
  /** CTA color scheme; defaults to 'lightwell' (Red Hat red) */
  ctaColorScheme?: ProductNudgeCtaColorScheme;
  /** Additional CSS class forwarded to the root element */
  className?: string;
  /** OUIA component ID */
  ouiaId?: string;
}

export interface ProductNudgeFieldProps {
  /** false renders null */
  isEligible: boolean;
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
  /** Bold headline in the description */
  headline: string | React.ReactNode;
  /** Body paragraph in the description */
  bodyText: string | React.ReactNode;
  /** CTA link label */
  ctaText?: string;
  /** CTA link href */
  ctaUrl?: string;
  /** Full Lightwell logo for the DL term (light mode) */
  logo?: { src: string; alt: string };
  /** Full Lightwell logo for the DL term (dark mode) */
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
  /** Summary counts shown in the match breakdown chart */
  matchData?: ProductNudgeMatchData;
  /** Per-ecosystem counts shown in the ecosystem chart */
  ecosystemData?: ProductNudgeEcosystemData[];
}

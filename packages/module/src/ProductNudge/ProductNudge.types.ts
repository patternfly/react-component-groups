import React from 'react';

export interface NudgeContact {
  /** Modal title text */
  title: string;
  /** Introductory paragraph shown above the form */
  intro: string;
  /** Message pre-fill template; supports {{key}} tokens resolved from NudgeMetric.key */
  messageTemplate: string;
  /** Consent / data-use disclosure text rendered below the form */
  consent: string;
  /** Message shown in place of the form after a successful submit */
  successMessage: string;
}

export interface NudgeContent {
  /** Unique content identifier, e.g. 'lightwell.ocm.overview' */
  id: string;
  /** Primary heading text */
  headline: string;
  /** Primary body paragraph */
  body: string;
  /** Optional secondary body paragraph */
  secondaryBody?: string;
  /** Optional hedged legal/disclaimer text rendered in a small element */
  disclosure?: string;
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
    /** Logo rendered above the headline */
    logo?: { src: string; alt: string };
    /** CSS url() value for the hero background */
    backgroundImage?: string;
    /** Rendered beside the CTA button */
    partnerLockup?: { src: string; alt: string };
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
  /** Template interpolation key matching {{key}} tokens in NudgeContact.messageTemplate */
  key?: string;
}

/** Visual weight / layout variant */
export type ProductNudgeProminence = 'hero' | 'banner' | 'inline' | 'compact';

/** Interaction pattern */
export type ProductNudgeBehavior = 'persistent' | 'dismissible' | 'collapsible';

/** CTA color scheme; 'lightwell' applies the Red Hat red accent, 'default' uses standard PF blue */
export type ProductNudgeCtaColorScheme = 'lightwell' | 'default';

export interface ContactFormValues {
  name: string;
  email: string;
  contactPerson: string;
  message: string;
}

export interface ProductNudgeContactModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Contact modal content (titles, intro, template, consent) */
  content: NudgeContact;
  /** Metrics used to interpolate the message template */
  metrics?: NudgeMetric[];
  /** Pre-filled name value */
  prefillName?: string;
  /** Pre-filled email value */
  prefillEmail?: string;
  /** Transport handler; resolves on success, rejects on failure */
  onSubmit: (values: ContactFormValues) => Promise<void>;
  /** Optional content rendered in the modal footer (e.g. partner logo lockup) */
  footerContent?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
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
  /** Headline / term text */
  titleText: string;
  /** Body description text */
  bodyText: string;
  /** CTA link label */
  ctaText?: string;
  /** CTA link href */
  ctaUrl?: string;
  /** Logo rendered as the description list term */
  logo?: { src: string; alt: string };
  /** OUIA component ID */
  ouiaId?: string;
  /** Additional CSS class */
  className?: string;
  /** data-testid forwarded to the root element */
  'data-testid'?: string;
}

export interface ProductNudgeMatchAnalysisModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
}

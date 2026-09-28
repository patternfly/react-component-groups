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

export interface ProductNudgeMatchData {
  exact: number;
  partial: number;
  noMatch: number;
}

export interface ProductNudgeEcosystemData extends ProductNudgeMatchData {
  name: string | React.ReactNode;
}

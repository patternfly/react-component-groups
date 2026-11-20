import React from 'react';

export type ProductNudgeBrand = 'lightwell';

export interface ProductNudgeImage {
  /** Image URL. */
  src: string;
  /** Accessible alt text; pass an empty string for a purely decorative image. */
  alt: string;
}

/** Brand images that can be applied by a named brand preset or overridden by consumers. */
export interface ProductNudgeBrandAssets {
  /** Full logo shown in light mode (and in dark mode when `logoDark` is not provided). */
  logo?: ProductNudgeImage;
  /** Full logo shown in dark mode; falls back to `logo` when not provided. */
  logoDark?: ProductNudgeImage;
  /** Compact logomark shown in light mode (for example in the inline variant's alert icon). */
  logomark?: ProductNudgeImage;
  /** Compact logomark shown in dark mode; falls back to `logomark` when not provided. */
  logomarkDark?: ProductNudgeImage;
  /** Background image URL for the full-width variant in light mode. */
  backgroundImageLight?: string;
  /** Background image URL for the full-width variant in dark mode. */
  backgroundImageDark?: string;
  /** Partner logo shown in modal footers in light mode. */
  partnerLogo?: ProductNudgeImage;
  /** Partner logo shown in modal footers in dark mode; falls back to `partnerLogo` when not provided. */
  partnerLogoDark?: ProductNudgeImage;
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
  cta:
    | {
        /** Button label */
        label: string;
        /** 'contact' fires onAction */
        action: 'contact';
        href?: never;
      }
    | {
        /** Link label */
        label: string;
        /** 'link' renders an anchor to href */
        action: 'link';
        /** Required when action is 'link' */
        href: string;
      };
  /** Contact modal content; required when cta.action is 'contact' */
  contact?: NudgeContact;
  /** Optional React icon rendered for icon-bearing variant modes. */
  icon?: React.ReactNode;
  /** Visual severity when variant is `inline`; defaults to `info`. */
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

/** Visual layout variant: `full-width` for a prominent hero placement, `inline` for an alert-style message, `compact` for an in-context field placement. */
export type ProductNudgeVariant = 'full-width' | 'inline' | 'compact';

/** Interaction pattern */
export type ProductNudgeBehavior = 'persistent' | 'dismissible' | 'collapsible';

/**
 * CTA color scheme; 'lightwell' applies the Lightwell red accent, 'default' uses PatternFly
 * styling, 'custom' applies the caller-supplied `ctaStyle` prop.
 */
export type ProductNudgeCtaColorScheme = 'lightwell' | 'default' | 'custom';

/** Heading element used for the nudge headline. */
export type ProductNudgeHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface ProductNudgeAction {
  /** Button or link label. */
  label: React.ReactNode;
  /** Renders the action as a link when provided. */
  href?: string;
  /** Click handler, used when `href` is not provided. */
  onClick?: () => void;
}

export interface ProductNudgeContactFormField {
  /** Stable key used in the submitted values object. */
  name: string;
  /** Accessible field label. */
  label: React.ReactNode;
  /** Native input type. */
  type?: 'text' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'time' | 'url';
  /** Placeholder text shown inside the empty field. */
  placeholder?: string;
  /** Marks the field as required for submission. */
  isRequired?: boolean;
  /** Native `autocomplete` attribute value. */
  autoComplete?: string;
  /** Supplementary help text rendered below the field. */
  helpText?: React.ReactNode;
}

export type ContactFormValues = Record<string, string>;

export interface ProductNudgeMatchData {
  /** Count of exact matches. */
  exact: number;
  /** Count of partial matches. */
  partial: number;
  /** Count of items with no match. */
  noMatch: number;
}

export interface ProductNudgeEcosystemData extends ProductNudgeMatchData {
  /** Ecosystem display name. */
  name: string | React.ReactNode;
}

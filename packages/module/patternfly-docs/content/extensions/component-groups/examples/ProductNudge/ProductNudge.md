---
section: extensions
subsection: component-groups
id: Product nudge
source: react
propComponents: [
  'ProductNudge',
  'ProductNudgeContactModal',
  'ProductNudgeStack',
  'ProductNudgeDescriptionItem',
  'ProductNudgeDataModal',
  'ProductNudgeModalFooter',
  'ProductNudgeBrandLogo',
  'NudgeContent',
  'NudgeContact',
  'NudgeMetric',
  'ProductNudgeImage',
  'ProductNudgeBrandAssets',
  'ProductNudgeContactFormField',
  'ProductNudgeAction',
  'ProductNudgeMatchData',
  'ProductNudgeEcosystemData'
]
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ProductNudge/ProductNudge.md
---

import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import { ProductNudgeContactModal, ProductNudgeStack, ProductNudgeDescriptionItem, ProductNudgeDataModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import { lightwellBackgroundAssets } from '@patternfly/react-component-groups/dist/esm/ProductNudge/productNudgeLightwellBackgrounds';
import { useState } from 'react';
import { DescriptionList } from '@patternfly/react-core';

A **product nudge** surfaces a product offer or upsell in context.

To render a nudge, provide:

- its `variant`
- an `isEligible` value
- `content` with a unique `id`, headline, body, and CTA

The `variant` property selects the layout: `full-width`, `inline`, or `compact`. Each variant is described in its own example below. A link CTA uses an `href` property, whereas a contact CTA calls your `onAction` callback (not needed for link CTAs). The `behavior` property controls whether the nudge is persistent (the default), dismissible, or collapsible.

Optional callbacks let your application respond to impressions, dismissals, and CTA actions: `onImpression` fires once when at least half of the nudge is visible, while the `onDismiss` and `onAction` callbacks run for their corresponding user actions. These callbacks do not persist dismissal state or implement a contact workflow; your application owns that behavior.

Product copy is always supplied by the caller. Components that support `brand="lightwell"` use the included Lightwell visual assets and CTA styling. You can omit the `brand` property for neutral PatternFly styling, or provide image props for custom branding. Explicit image props take precedence over Lightwell assets, and the brand option never supplies product copy. Some examples on this page include a "Use Lightwell branding" checkbox so you can preview each component with and without the Lightwell preset.

## Examples

### Full-width variant

The `full-width` variant spans the available width and uses a large CTA.

<div className="pf-v6-u-mb-md" />

The Lightwell preset's small SVG logo, logomark, and partner-logo assets ship with the package by default. Its hero background images (~2 MB combined) are published separately and are not included in the default import. To use the Lightwell hero background, import `lightwellBackgroundAssets` from `@patternfly/react-component-groups/dist/esm/ProductNudge/productNudgeLightwellBackgrounds` and spread it into `content.assets`, as shown below. Brand image sizing (`logoSize`/`logoOffset` and `logoMarkSize`/`logoMarkOffset`) and the hero background color (`backgroundColor`) can be overridden regardless of brand. To define a custom CTA color scheme, set `ctaColorScheme="custom"` and provide `ctaStyle`.

```js file="./ProductNudgeHeroExample.tsx"

```

### Inline variant

The `inline` variant uses an inline PatternFly [alert](/components/Alert), making it suitable for a sidebar or below a page heading.

```js file="./ProductNudgeAlertExample.tsx"

```

### Contact modal

Use `ProductNudgeContactModal` to provide a contact or lead-capture form. Your application controls when the modal opens and what happens after submission.

<div className="pf-v6-u-mb-md" />

Set `titleText`, `descriptionText`, and `submitText` for the modal content. By default, the form has name, email, and phone fields. You can pass the `fields` property to configure custom fields, including their names, labels, input types, placeholders, required state, autocomplete, and help text. The `onSubmit` callback receives an object keyed by each field's `name`.

<div className="pf-v6-u-mb-md" />

Uncheck "Use Lightwell branding and default fields" to see a custom field configuration with generic placeholder copy instead of the Lightwell preset.

```js file="./ProductNudgeContactModalExample.tsx"

```

### Contact modal with a submission error

When `onSubmit` rejects, the modal shows an inline danger alert at the top of the form and moves focus to it. Provide a specific `errorMessage` that lists each field with an error, states the issue, and, where possible, how to resolve it. For example: "Work email format is invalid. Please ensure your email follows a format similar to `john@mail.com`." The `errorTitle` can stay more generic.

<div className="pf-v6-u-mb-md" />

In this example, `onSubmit` validates the values, stores one message per invalid field in state, and then throws. Submit with empty or invalid values to see the alert. The work email field uses `type: 'text'` so the browser's built-in validation doesn't intercept the submission.

```js file="./ProductNudgeContactModalErrorExample.tsx"

```

### Data modal

`ProductNudgeDataModal` shows built-in match charts. Pass `matchData` to show the match analysis chart, `ecosystemData` to show the by-ecosystem chart, or both to show both charts. The ecosystem chart's axis scales to fit your data. The chart data, colors, brand, icon, and partner logo are customizable.

<div className="pf-v6-u-mb-md" />

When using the built-in charts, load `@patternfly/patternfly/patternfly-charts.css` alongside the standard PatternFly styles. It provides chart design tokens, including theme-aware colors for dark mode.

```js file="./ProductNudgeDataModalExample.tsx"

```

### Data modal with custom content

Pass `customContent` to `<ProductNudgeDataModal>` in order to fully replace the built-in chart region with any caller-supplied content.

```js file="./ProductNudgeCustomContentExample.tsx"

```

### Compact variant

Use `variant="compact"` for a compact nudge near related content or data within `ProductNudge`. The first item in `metrics` is shown as the nudge's value, followed by its label (for example, "6 clusters threatened").

```js file="./ProductNudgeCompactExample.tsx"

```

### In-context stack

Use `ProductNudgeStack` directly for a compact, self-contained block with an optional title icon, heading, value or headline, body note, and inline CTA. It renders the same compact treatment as `ProductNudge` with `variant="compact"`.

```js file="./ProductNudgeStackExample.tsx"

```

### Description list item

`ProductNudgeDescriptionItem` renders a PatternFly `DescriptionListGroup`, and must be placed inside an existing [description list component](/components/description-list) alongside other items. Set `termText` and optionally `termIcon`; the description can include a headline/value, body, and optional link.

```js file="./ProductNudgeDescriptionItemExample.tsx"

```

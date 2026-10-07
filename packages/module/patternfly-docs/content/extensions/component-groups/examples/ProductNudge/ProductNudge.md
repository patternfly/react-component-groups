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

A **product nudge** surfaces a product offer or upsell in context. The `ProductNudge` component supports three layouts through `prominence`: `hero` for a prominent full-width placement, `alert` for an inline message, and `field` for a compact, in-context placement.

To render a nudge, provide its `prominence`, an `isEligible` value, and `content` with a unique `id`, headline, body, and CTA. Set `isEligible` to `false` to render nothing. A link CTA uses an `href`; a contact CTA calls your `onAction` callback. The `behavior` prop controls whether the nudge is persistent (the default), dismissible, or collapsible. Optional callbacks let your application respond to impressions, dismissals, and CTA actions: `onImpression` fires once when at least half of the nudge is visible, while `onDismiss` and `onAction` run for their corresponding user actions. These callbacks do not persist dismissal state or implement a contact workflow; your application owns that behavior.

Product copy is always supplied by the caller. Components that support `brand="lightwell"` use the included Lightwell visual assets and CTA styling; omit the prop for neutral PatternFly styling, or provide image props for custom branding. Explicit image props take precedence over Lightwell assets, and the brand option never supplies product copy. The Hero, Contact modal, and Data modal examples below include a "Use Lightwell branding" checkbox so you can preview each component with and without the Lightwell preset.

## Examples

### Hero

The `hero` prominence spans the available width and uses a large CTA. This example opts into the Lightwell background image; the extra import is optional. Uncheck "Use Lightwell branding" to see the same layout with generic placeholder copy, a custom logo, and the standard PatternFly CTA styling instead of the Lightwell preset.

```js file="./ProductNudgeHeroExample.tsx"

```

The Lightwell preset's small SVG logo, logomark, and partner-logo assets ship with the package by default. Its hero background images (~2 MB combined) are published separately and are not included in the default import. To use the Lightwell hero background, import `lightwellBackgroundAssets` from `@patternfly/react-component-groups/dist/esm/ProductNudge/productNudgeLightwellBackgrounds` and spread it into `content.assets`, as shown above. Brand image sizing (`logoSize`/`logoOffset` and `logoMarkSize`/`logoMarkOffset`) and the hero background color (`backgroundColor`) can be overridden regardless of brand. To define a custom CTA color scheme, set `ctaColorScheme="custom"` and provide `ctaStyle`.

### Alert

The `alert` prominence uses an inline PatternFly Alert, making it suitable for a sidebar or below a page heading.

```js file="./ProductNudgeAlertExample.tsx"

```

### Field prominence

Use `prominence="field"` for a compact nudge near related content or data. It renders the same compact treatment as `ProductNudgeStack`; see [In-context stack](#in-context-stack) for the standalone component and its props.

### Contact modal

Use `ProductNudgeContactModal` to provide a contact or lead-capture form. Your application controls when the modal opens and what happens after submission. Set `titleText`, `descriptionText`, and `submitText` for the modal content. By default, the form has name, email, and phone fields; pass `fields` to configure the fields, including their names, labels, input types, placeholders, required state, autocomplete, and help text. The `onSubmit` callback receives an object keyed by each field's `name`. Uncheck "Use Lightwell branding" to see a custom field configuration with generic placeholder copy instead of the Lightwell preset.

```js file="./ProductNudgeContactModalExample.tsx"

```

### Data modal

`ProductNudgeDataModal` can show built-in match charts or caller-provided `customContent`. To show the built-in charts, pass both `matchData` and `ecosystemData`. Otherwise, pass `customContent` to replace the chart region with any content—not only another chart. Supply the title and any desired description, footer copy, and actions. Chart data, colors, brand, icon, and partner logo are customizable. Use `contentAriaLabel` to label the scrollable content region, which wraps either the charts or `customContent`; use `titleIconSize` to resize the title icon. Uncheck "Use Lightwell branding" to see a custom chart palette and generic placeholder copy instead of the Lightwell preset.

When using the built-in charts, load `@patternfly/patternfly/patternfly-charts.css` alongside the standard PatternFly styles. It provides chart design tokens, including theme-aware colors for dark mode.

```js file="./ProductNudgeDataModalExample.tsx"

```

### Custom content

`customContent` fully replaces the built-in chart region with any caller-supplied content — it doesn't have to be a chart.

```js file="./ProductNudgeCustomContentExample.tsx"

```

### In-context stack

`ProductNudgeStack` renders a compact, self-contained block with an optional title icon, heading, value or headline, body note, and inline CTA. Use it on its own or use `ProductNudge` with `prominence="field"` for the equivalent placement within the main component.

```js file="./ProductNudgeStackExample.tsx"

```

### Description list item

`ProductNudgeDescriptionItem` renders a `DescriptionListGroup`. Place it inside an existing `DescriptionList` alongside other items. Set `termText` and optionally `termIcon`; the description can include a headline/value, body, and optional link.

```js file="./ProductNudgeDescriptionItemExample.tsx"

```

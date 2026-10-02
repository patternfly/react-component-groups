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

A **product nudge** surfaces a product offer or upsell in context. It adapts to several layout modes via the `prominence` prop and handles impression tracking, dismissal, and contact CTAs out of the box.

All product copy is supplied by the caller. Each component accepts a `brand="lightwell"` option to apply the included Lightwell visual assets and CTA styling; omit it for neutral PatternFly styling, or pass image props to supply custom branding. Explicit image props take precedence over the Lightwell assets, and the brand option never supplies product copy. See the [Custom brand](#custom-brand) example for a nudge built without the Lightwell preset.

Sizing for brand imagery (`logoSize`/`logoOffset`, `logoMarkSize`/`logoMarkOffset`, `titleIconSize`) and the hero background color (`backgroundColor`) are also caller-overridable; their defaults match the current Lightwell assets, so Lightwell usage is unaffected unless you pass an override. `ctaColorScheme="custom"` paired with a `ctaStyle` prop lets you apply an entirely custom CTA color scheme instead of the built-in Lightwell/default options.

**Bundle size:** the Lightwell brand preset's small SVG logo/logomark/partner-logo assets ship with the package by default. Its hero background images (~2MB combined) are intentionally **not** included in the default import — they're published as a separate module so consumers who don't use the Lightwell hero background never pay for those bytes. A Lightwell hero that wants the background opts in with one extra import — `import { lightwellBackgroundAssets } from '@patternfly/react-component-groups/dist/esm/ProductNudge/productNudgeLightwellBackgrounds'` — and spreads it into `content.assets` alongside `lightwellBrandAssets` (see the Hero example below).

## Examples

### Hero

The hero prominence spans the full available width with a background image and a large CTA.

```js file="./ProductNudgeHeroExample.tsx"

```

### Custom brand

Omit `brand` and supply your own text, image, color, and sizing props to build a nudge with no Lightwell dependency at all.

```js file="./ProductNudgeCustomBrandExample.tsx"

```

### Alert

A low-profile inline nudge using a PF6 Alert, suitable for sidebars or below page headings.

```js file="./ProductNudgeAlertExample.tsx"

```

### Contact modal

Use `ProductNudgeContactModal` for CTAs that open a contact/lead-capture form. Set `titleText`, `descriptionText`, and `submitText` for the modal content. Configure `fields` to provide field names, labels, input types, placeholders, required state, autocomplete, and help text. The `onSubmit` callback receives values keyed by each field's `name`; the default fields remain name, email, and phone.

```js file="./ProductNudgeContactModalExample.tsx"

```

### Data modal

`ProductNudgeDataModal` can render the built-in match charts or caller-provided `customContent` — `customContent` accepts any content, not only a replacement chart. Pass both `matchData` and `ecosystemData` to use the built-in charts. Supply its title and any desired description/footer copy and actions explicitly. The chart data, colors, brand, icon, and partner logo can also be customized. Use `contentAriaLabel` to relabel the scrollable content region (it wraps both the built-in chart and `customContent`), and `titleIconSize` to resize the title icon.

Applications that render the built-in charts must load `@patternfly/patternfly/patternfly-charts.css` alongside the standard PatternFly styles. This provides chart design tokens, including theme-aware colors for dark mode.

```js file="./ProductNudgeDataModalExample.tsx"

```

### Custom modal options

Customize the built-in chart palette, supply a title icon and partner logo, and define contact-form fields for the values your application needs. The contact modal submits an object keyed by each field's `name`.

```js file="./ProductNudgeCustomOptionsExample.tsx"

```

### Custom content

`customContent` fully replaces the built-in chart region with any caller-supplied content — it doesn't have to be a chart.

```js file="./ProductNudgeCustomContentExample.tsx"

```

### Description list item

`ProductNudgeDescriptionItem` renders as a `DescriptionListGroup` — drop it directly inside an existing `DescriptionList` alongside other items. Set `termText` and optionally `termIcon`; the description consists of a headline/value, body, and optional link.

```js file="./ProductNudgeDescriptionItemExample.tsx"

```

### In-context stack

`ProductNudgeStack` renders a self-contained stack block — optional title icon, heading label, optional value/headline, body note, and an inline link CTA.

```js file="./ProductNudgeStackExample.tsx"

```

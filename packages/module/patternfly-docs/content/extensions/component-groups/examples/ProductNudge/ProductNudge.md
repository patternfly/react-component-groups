---
section: extensions
subsection: component-groups
id: Product nudge
source: react
propComponents: ['ProductNudge', 'ProductNudgeContactModal', 'ProductNudgeField', 'ProductNudgeDescriptionItem', 'ProductNudgeMatchAnalysisModal']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ProductNudge/ProductNudge.md
---

import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import { ProductNudgeContactModal, ProductNudgeField, ProductNudgeDescriptionItem, ProductNudgeMatchAnalysisModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import { useState } from 'react';
import { DescriptionList } from '@patternfly/react-core';

A **product nudge** surfaces a product offer or upsell in context. It adapts to several layout modes via the `prominence` prop and handles impression tracking, dismissal, and contact CTAs out of the box.

All product copy is supplied by the caller. Each component accepts a `brand="lightwell"` option to apply the included Lightwell visual assets and CTA styling; omit it for neutral PatternFly styling, or pass image props to supply custom branding. Explicit image props take precedence over the Lightwell assets, and the brand option never supplies product copy.

## Examples

### Hero

The hero prominence spans the full page width with a background image and a large CTA.

```js file="./ProductNudgeHeroExample.tsx"

```

### Alert

A low-profile inline nudge using a PF6 Alert, suitable for sidebars or below page headings.

```js file="./ProductNudgeAlertExample.tsx"

```

### Contact modal

Use `ProductNudgeContactModal` for CTAs that open a contact/lead-capture form. Set `titleText`, `descriptionText`, and `submitText` for the modal content. Configure `fields` to provide field names, labels, input types, placeholders, required state, autocomplete, and help text. The `onSubmit` callback receives values keyed by each field's `name`; the default fields remain name, email, and phone.

```js file="./ProductNudgeContactModalExample.tsx"

```

### Match analysis modal

`ProductNudgeMatchAnalysisModal` can render the built-in match charts or caller-provided `analysisContent`. Pass both `matchData` and `ecosystemData` to use the built-in charts. Supply its title and any desired description/footer copy and actions explicitly. The chart data, colors, brand, icon, and partner lockup can also be customized.

```js file="./ProductNudgeMatchAnalysisModalExample.tsx"

```

### Description list item

`ProductNudgeDescriptionItem` renders as a `DescriptionListGroup` — drop it directly inside an existing `DescriptionList` alongside other items. Set `termText` and optionally `termIcon`; the description consists of a headline/value, body, and optional link.

```js file="./ProductNudgeDescriptionItemExample.tsx"

```

### In-context field (stack)

`ProductNudgeField` renders a self-contained stack block — optional title icon, heading label, optional value/headline, body note, and an inline link CTA.

```js file="./ProductNudgeFieldExample.tsx"

```

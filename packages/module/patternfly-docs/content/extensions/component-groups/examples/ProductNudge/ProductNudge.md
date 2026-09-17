---
section: extensions
subsection: component-groups
id: Product nudge
source: react
propComponents: ['ProductNudge', 'ProductNudgeContactModal', 'ProductNudgeField', 'ProductNudgeMatchAnalysisModal']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ProductNudge/ProductNudge.md
---

import ProductNudge from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';
import ProductNudgeContactModal from '@patternfly/react-component-groups/dist/dynamic/ProductNudgeContactModal';
import ProductNudgeField from '@patternfly/react-component-groups/dist/dynamic/ProductNudgeField';
import ProductNudgeMatchAnalysisModal from '@patternfly/react-component-groups/dist/dynamic/ProductNudgeMatchAnalysisModal';
import { useState } from 'react';
import { DescriptionList } from '@patternfly/react-core';

A **product nudge** surfaces a product offer or upsell in context. It adapts to several layout modes via the `prominence` prop and handles impression tracking, dismissal, and contact CTAs out of the box.

All content — headline, body, CTA, assets — is supplied via the `content` prop. The component ships default Lightwell brand assets but accepts overrides for any image.

## Examples

### Hero

The hero prominence spans the full page width with a background image and a large CTA.

```js file="./ProductNudgeHeroExample.tsx"

```

### Compact (alert)

The compact prominence is a low-profile inline nudge suitable for sidebars or below page headings.

```js file="./ProductNudgeCompactExample.tsx"

```

### Contact modal

Use `ProductNudgeContactModal` for CTAs that open a contact/lead-capture form. Inject transport via `onSubmit`. Pass `footerContent` to render partner logos.

```js file="./ProductNudgeContactModalExample.tsx"

```

### Match analysis modal

`ProductNudgeMatchAnalysisModal` renders a Victory chart modal showing package match analysis data.

```js file="./ProductNudgeMatchAnalysisModalExample.tsx"

```

### In-context detail (field)

`ProductNudgeField` embeds inside an existing `DescriptionList` — for example, a cluster details card.

```js file="./ProductNudgeFieldExample.tsx"

```

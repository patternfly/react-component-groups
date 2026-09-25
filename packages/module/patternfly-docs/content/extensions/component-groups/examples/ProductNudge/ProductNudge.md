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
import LightwellBgLight from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-bg-light.png';
import LightwellBgDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-bg-dark.png';
import LightwellLogo from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo.svg';
import LightwellLogoDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logo-dark.svg';
import LightwellLogomark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logomark-light.svg';
import LightwellLogomarkDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/lightwell-logomark-dark.svg';
import RedHatIBMLockup from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/RedHatIBMLockup.svg';
import RedHatIBMLockupDark from '@patternfly/react-component-groups/dist/dynamic/ProductNudge/assets/RedHatIBMLockupDark.svg';
import { useState } from 'react';
import { DescriptionList } from '@patternfly/react-core';

A **product nudge** surfaces a product offer or upsell in context. It adapts to several layout modes via the `prominence` prop and handles impression tracking, dismissal, and contact CTAs out of the box.

All content — headline, body, CTA, assets — is supplied via the `content` prop. The component ships default Lightwell brand assets but accepts overrides for any image.

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

Use `ProductNudgeContactModal` for CTAs that open a contact/lead-capture form. Set `titleText`, `descriptionText`, and `submitText` for the modal content. The `onSubmit` callback receives the entered name, email, and optional phone number as `ContactFormValues`.

```js file="./ProductNudgeContactModalExample.tsx"

```

### Match analysis modal

`ProductNudgeMatchAnalysisModal` renders a Victory chart modal showing package match analysis data.

```js file="./ProductNudgeMatchAnalysisModalExample.tsx"

```

### Description list item

`ProductNudgeDescriptionItem` renders as a `DescriptionListGroup` — drop it directly inside an existing `DescriptionList` alongside other items. Term = logomark + label; description = headline + body + link.

```js file="./ProductNudgeDescriptionItemExample.tsx"

```

### In-context field (stack)

`ProductNudgeField` renders a self-contained branded stack block — logomark, heading label, optional value, body note, and an inline link CTA.

```js file="./ProductNudgeFieldExample.tsx"

```

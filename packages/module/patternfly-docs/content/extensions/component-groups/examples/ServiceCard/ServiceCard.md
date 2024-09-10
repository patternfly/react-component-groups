---
section: Component groups
subsection: Content containers
id: Service card
source: react
propComponents: ['ServiceCard']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ServiceCard/ServiceCard.md
---

import ServiceCard from "@patternfly/react-component-groups/dist/dynamic/ServiceCard";
import { EllipsisVIcon } from '@patternfly/react-icons';
import contentHeaderIcon from '../../assets/icons/content-header-icon.svg'

The **service card** component displays a card representing a service with an icon, title, description, and an optional customized footer

## Examples

### Basic service card

This shows a basic service card with an `icon`, `title`, `description`, and optional footer passed in. You can also pass all props of the [card component](/components/card).

```js file="./ServiceCardExample.tsx"

```

### Stacked service card

If you set `isStacked` property to `true`, the header layout changes to stacked.

```js file="./ServiceCardStackedExample.tsx"

```

### Service card in a gallery

This shows how cards can look side by side in a [gallery layout](/layouts/gallery). If you set `isFullHeight` property to `true`, the card height will fill the available space.

```js file="./ServiceCardGalleryExample.tsx"

```


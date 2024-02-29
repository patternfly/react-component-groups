---
section: extensions
subsection: Component groups
id: Multi content card
source: react
propComponents: ['MultiContentCard']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/MultiContentCard/MultiContentCard.md
---

import MultiContentCard from "@patternfly/react-component-groups/dist/dynamic/MultiContentCard";
import { ArrowRightIcon, BellIcon, CogIcon, EllipsisVIcon, LockIcon } from '@patternfly/react-icons';

A **multi content card** component allows to display multiple card components in a single layout. To further customize this layout, you can also utilize all properties of the [card component](/components/card), with the exception of `children` and `title`.

## Examples

### Basic multi content card

To display a basic multi content an array of content cards has to be passed using the `cards` property. It is recommended to use regular [card components](/components/card) in the content.

```js file="./MultiContentCardExample.tsx"

```

### Expandable multi content card

To make the multi content card expandable, pass `isExpandable` flag together with `toggleText` or `toggleContent` property. Default expansion state can be adjusted using `defaultExpanded` property.

```js file="./MultiContentCardExpandableExample.tsx"

```

### Expandable multi content card with actions

Actions can be displayed in the multi content card heading using `actions` property. 

```js file="./MultiContentCardExpandableActionsExample.tsx"

```

### Expandable multi content card with left border and header border

Left border can be displayed using `leftBorderVariant`. To display a border under the multi content card's heading, use `withHeaderBorder` flag. 

```js file="./MultiContentCardExpandableBorderExample.tsx"

```

### Expandable multi content card with dividers

Dividers between cards in the content can be shown using `withDividers` flag. 

```js file="./MultiContentCardExpandableDividerExample.tsx"

```

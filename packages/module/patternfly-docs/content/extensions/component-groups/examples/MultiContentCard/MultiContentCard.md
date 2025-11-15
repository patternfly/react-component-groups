---
section: extensions
subsection: component-groups
id: Multi-content card
source: react
propComponents: ['MultiContentCard']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/MultiContentCard/MultiContentCard.md
---

import MultiContentCard, { MultiContentCardDividerVariant } from "@patternfly/react-component-groups/dist/dynamic/MultiContentCard";
import { ArrowRightIcon, BellIcon, CogIcon, EllipsisVIcon, LockIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';
import { css } from '@patternfly/react-styles';
import { FunctionComponent, useState } from 'react';

A **multi-content card** component allows to display multiple card components in a single layout. To further customize this layout, you can also utilize all properties of the [card component](/components/card), with the exception of `children` and `title`.

## Examples

### Basic multi-content card

To display a basic multi-content an array of content cards has to be passed using the `cards` property. It is recommended to use regular [card components](/components/card) in the content.

```js file="./MultiContentCardExample.tsx"

```

### Expandable multi-content card

To make the multi-content card expandable, pass `isExpandable` flag together with `toggleText` or `toggleContent` property. Default expansion state can be adjusted using `defaultExpanded` property.

```js file="./MultiContentCardExpandableExample.tsx"

```

### Expandable multi-content card with actions and labels

Actions can be displayed in the multi-content card heading using `actions` property. Also, you can make use of [label components](/components/label) for your card content.

```js file="./MultiContentCardExpandableActionsExample.tsx"

```

### Expandable multi content card with dividers

Dividers between all cards in the content can be shown using `withDividers` flag.

```js file="./MultiContentCardExpandableDividerExample.tsx"

```

### Expandable multi-content card with single dividers

To enable a divider just for a single card, use `dividerVariant` property passed to the `cards` array.

```js file="./MultiContentCardExpandableSingleDividerExample.tsx"

```

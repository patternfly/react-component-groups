---
section: extensions
subsection: component-groups
id: Tearsheet
source: react
propComponents: ['Tearsheet', 'TearsheetHeader', 'TearsheetBody', 'TearsheetFooter', 'TearsheetGroup']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Tearsheet/Tearsheet.md
---

import { Fragment, useState } from 'react';
import spacing from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import TearsheetGroup from '@patternfly/react-component-groups/dist/dynamic/TearsheetGroup';
import Tearsheet from '@patternfly/react-component-groups/dist/dynamic/Tearsheet';
import TearsheetHeader from '@patternfly/react-component-groups/dist/dynamic/TearsheetHeader';
import TearsheetBody from '@patternfly/react-component-groups/dist/dynamic/TearsheetBody';
import TearsheetFooter from '@patternfly/react-component-groups/dist/dynamic/TearsheetFooter';

**Tearsheet** are a full-screen extension of the `<Modal>` component allowing more complex experiences to be provided to the user.
While the biggest Modal size (`ModalVariant.large`) may work for some cases, tearsheets allow near the entire real-estate to be leveraged.
This component extends the [modal component](/components/modal) allowing any use of its properties to be provided.

## Examples

### Basic

Basic tearsheets should make use of the entire container. For this basic example, heading and body text is rendered with an action list placed within the footer area.

```ts file="./TearsheetBasic.tsx"
```

### Tearsheet layouts

Tearsheets can be customized to render various layout styles. These layout styles include, [full width text](https://www.patternfly.org/foundations-and-styles/utility-classes/alignment), [flex](https://www.patternfly.org/foundations-and-styles/layouts/flex), and [grid](https://www.patternfly.org/foundations-and-styles/layouts/grid).
The `<TearsheetBody>` component will handle scrolling for long content.

```ts file="./TearsheetLayouts.tsx"
```

### Stacked

One special use case with tearsheets is stacking.
When a user is using a tearsheet, if another one needs to open it can open one level "on-top" of it in a new stack.
Tearsheets offer 3 stack levels (0,1,2). 
A special stack level -1 allows a tearsheet to hide behind others.

```ts file="./TearsheetStacked.tsx"
```

### Tearsheet group (infinite stacking)

Use a `TearsheetGroup` to manage an unbounded number of stacked tearsheets.
`children` rendering order determines stacking priority with later children stacking in front of earlier ones.
Only the top 3 open tearsheets are visible; earlier ones hide behind the stack and reappear as front tearsheets are closed.

```ts file="./TearsheetGroup.tsx"
```

### Tearsheets vs Modals

To illustrate the difference between a tearsheet and a modal, this example showcases a complex use case with a search bar, side panel, and a number of cards.
In a modal the content is crammed and is not as usable as if it were on a bigger area like the tearsheet.

```ts file="./TearsheetComparison.tsx"
```

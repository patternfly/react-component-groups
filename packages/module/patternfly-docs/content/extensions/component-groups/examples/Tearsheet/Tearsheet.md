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

**Tearsheet** is an extension of the [modal component](/components/modal), allowing more complex experiences to be provided to the user. Additionally, while the biggest `<Modal>` size (`ModalVariant.large`) may work for some cases, tearsheet allows more of the viewport area to be utilized.

## Examples

### Basic

Basic tearsheets should make use of the entire container. For this basic example, heading and body text is rendered with an action list placed within the footer area.

```ts file="./TearsheetBasic.tsx"
```

### Tearsheet layouts

Tearsheets can be customized to render various layout styles. These layout styles include, [full width text](/foundations-and-styles/utility-classes/alignment), [flex](/foundations-and-styles/layouts/flex), and [grid](/foundations-and-styles/layouts/grid).

The `<TearsheetBody>` component will handle scrolling for long content.

```ts file="./TearsheetLayouts.tsx"
```

### Stacked

Tearsheets support stacking, allowing new sheets to open on top of active ones. They utilize three visible stack levels (0, 1, and 2) and a background level (-1) to hide inactive sheets.

Limit stacked tearsheets to a maximum of 3. Flows requiring 4 or more levels should be redesigned using multi-step wizard or dedicates page to prevent loss of user context.

```ts file="./TearsheetStacked.tsx"
```

### Tearsheets vs Modals

Choose a tearsheet over a modal when users need to process detailed and complex workflows.
This example demonstrates how the expanded surface area of a tearsheet allows users to easily navigate a robust layout without feeling overwhelmed.

```ts file="./TearsheetComparison.tsx"
```

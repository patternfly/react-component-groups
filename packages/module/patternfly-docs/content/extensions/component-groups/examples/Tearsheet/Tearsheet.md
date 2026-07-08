---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: component-groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Tearsheet
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['Tearsheet']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Tearsheet/Tearsheet.md
---

import { Fragment, useState } from 'react';
import spacing from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import TearsheetGroup from '@patternfly/react-component-groups/dist/dynamic/TearsheetGroup';
import Tearsheet from '@patternfly/react-component-groups/dist/dynamic/Tearsheet';
import TearsheetHeader from '@patternfly/react-component-groups/dist/dynamic/TearsheetHeader';
import TearsheetBody from '@patternfly/react-component-groups/dist/dynamic/TearsheetBody';
import TearsheetFooter from '@patternfly/react-component-groups/dist/dynamic/TearsheetFooter';

Tearsheet is used for ...

## Examples

### Basic

```ts file="./TearsheetBasic.tsx"
```

### Stacked

```ts file="./TearsheetStacked.tsx"
```

### Tearsheet group (infinite stacking)

Use a `TearsheetGroup` to manage an unbounded number of stacked tearsheets. Render order determines stacking priority — later children stack in front of earlier ones. Only the top 3 open tearsheets are visible; earlier ones hide behind the stack and reappear as front tearsheets are closed.

```ts file="./TearsheetGroup.tsx"
```

### Tearsheet layouts

```ts file="./TearsheetLayouts.tsx"
```

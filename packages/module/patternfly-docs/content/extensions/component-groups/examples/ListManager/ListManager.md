---
# Sidenav top-level section
# should be the same for all markdown files
section: Component groups
subsection: Helpers
# Sidenav secondary level section
# should be the same for all markdown files
id: List manager
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['ListManager']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ListManager/ListManager.md
---

import ListManager from '@patternfly/react-component-groups/dist/dynamic/ListManager';
import { FunctionComponent, useState } from 'react';

The **list manager** component can be used to implement customizable table columns. Columns can be configured to be enabled or disabled by default or be unhidable. 

## Examples

### Basic column list

The order of the columns can be changed by dragging and dropping the columns themselves. This list can be used within a page or within a modal. Always make sure to set `isShownByDefault` and `isSelected` (if needed) to the same boolean value in the initial state.

```js file="./ListManagerExample.tsx"

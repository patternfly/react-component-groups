---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Remove modal
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['RemoveModal']
---

import RemoveModal from '@patternfly/react-component-groups/dist/dynamic/RemoveModal';

A **remove modal** component displays a modal when a user performs a removal of a object, which asks them to confirm or cancel the action.

## Examples

### Basic remove modal

A basic remove modal is triggered when a user tries to perform a removal of an object.

```js file="./RemoveModalExample.tsx"

```

### Remove modal with checkbox
A basic remove modal that requires a checkbox before confirming. 
```js file="./RemoveModalCheckboxExample.tsx"

```


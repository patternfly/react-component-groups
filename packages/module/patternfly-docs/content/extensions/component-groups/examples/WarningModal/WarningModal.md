---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Warning modal
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['WarningModal']
---

import WarningModal from '@patternfly/react-component-groups/dist/dynamic/WarningModal';

A **warning modal** component displays a modal asking user to confirm his intention to perform a risky action.

## Examples

### Basic warning modal

A basic warning modal component provides users with a basic layout to which only specific texts need to be passed.
Action buttons callbacks can be customized using `onConfirm` and `onClose`.

```js file="./WarningModalExample.tsx"

```

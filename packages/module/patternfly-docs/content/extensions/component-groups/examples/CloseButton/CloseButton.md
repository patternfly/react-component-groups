---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: CloseButton
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['CloseButton']
---

import { CloseIcon } from '@patternfly/react-icons';
import CloseButton from '@patternfly/react-component-groups/dist/dynamic/CloseButton';

**Close button**

The close button component provides a way for users to exit a modal, dialogue, or similar action.

## Examples ##

You can use  onClick  to execute a callback when a user selects the close button.

```js file="./CloseButtonExample.tsx"

```

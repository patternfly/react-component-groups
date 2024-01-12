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

The **CloseButton** component is a standardize close button that is recommended to be used thorough out projects.

### Example

The following example shows a close button with an onClick call back.  Other then variant, all props that a PatternFly button uses are supported.

```js file="./CloseButtonExample.tsx"

```

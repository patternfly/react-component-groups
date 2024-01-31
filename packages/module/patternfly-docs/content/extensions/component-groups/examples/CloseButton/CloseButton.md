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

The **close button** component provides a way for users to exit a modal, dialogue, or similar action. To further customize this component, you can also utilize all properties of the [button component](/components/button).

## Examples

### Basic close button

You can use `onClick` to execute a callback when a user clicks the close button.

```js file="./CloseButtonExample.tsx"

```

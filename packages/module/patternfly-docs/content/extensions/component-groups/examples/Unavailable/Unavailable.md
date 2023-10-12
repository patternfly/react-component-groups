---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Unavailable
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['Unavailable']
---

import Unavailable from '@patternfly/react-component-groups/dist/dynamic/Unavailable';

An **unavialable** component displays a screen to users when they attempt to view a page that currently is unavailable.
It should be used when content the user is attempting to view is not available to them at the current time.  
You can add a `statusPageUrl` to provide a link to a status page for the service that is unavailable.

## Examples

### Unavailable example

```js file="./UnavailableExample.tsx"

```

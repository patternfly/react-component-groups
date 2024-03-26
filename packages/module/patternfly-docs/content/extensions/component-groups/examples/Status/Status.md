---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Status
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['Status']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Status/Status.md
---

import Status from '@patternfly/react-component-groups/dist/dynamic/Status';

The **Status** component displays different statuses for an item.  There are a variety of statuses that can be displayed components for example the link button status.

### Status supported

By default, the Status logo displays as normal and in full color, meaning that it is supported. 

```js file="./LinkStatusExample.tsx"

```
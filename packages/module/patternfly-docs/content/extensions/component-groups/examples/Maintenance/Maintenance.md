---
# Sidenav top-level section
# should be the same for all markdown files
section: Extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Maintenance
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['Maintenance']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Maintenance/Maintenance.md
---

import Maintenance from '@patternfly/react-component-groups/dist/dynamic/Maintenance';
import { FunctionComponent } from 'react';

A **maintenance** component displays a screen to users when they are undergoing scheduled maintenance.

## Examples

### Basic maintenance

To provide users with basic information regarding maintenance. A basic maintenance state should contain an appropriate and informative `titleText`. `defaultBodyText` will be used by default.

```js file="./MaintenanceExample.tsx"

```

### Custom maintenance

To override the default bodyText and footer link, specify your own using `bodyText` and `customFooter`. You may add a `startTime`, `endTime` and `timeZone` that will be displayed as shown below. `timeZone` will be set to UTC by default.

```js file="./MaintenanceCustomExample.tsx"

```

---
section: extensions
subsection: component-groups
id: Unauthorized access
source: react
propComponents: ['UnauthorizedAccess']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/UnauthorizedAccess/UnauthorizedAccess.md
---

import UnauthorizedAccess from "@patternfly/react-component-groups/dist/dynamic/UnauthorizedAccess";
import { FunctionComponent } from 'react';

A **not authorized** component displays an error screen to users when they attempt to view a page that they don't have permission to access.

## Examples

### Basic unauthorized access

A basic not authorized component displays a title, body text, and custom actions.

```js file="./UnauthorizedAccessExample.tsx"

```

### Unauthorized access with custom actions

You can customize the not authorized component to fit your use case by specifying the `serviceName` to appear in the title, a `bodyText` of appropriate context for the error, and the `actions` that a user can take instead.

```js file="./UnauthorizedAccessActionsExample.tsx"

```

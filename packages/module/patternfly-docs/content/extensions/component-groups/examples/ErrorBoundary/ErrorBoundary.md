---
# Sidenav top-level section
# should be the same for all markdown files
section: Component groups
subsection: Error communication
# Sidenav secondary level section
# should be the same for all markdown files
id: Error boundary
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['ErrorBoundary']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ErrorBoundary/ErrorBoundary.md
---

import { Button, Card, CardBody, CardFooter, CardHeader } from '@patternfly/react-core';
import ErrorBoundary from "@patternfly/react-component-groups/dist/dynamic/ErrorBoundary";
import { FunctionComponent, useState } from 'react';

The **error boundary** component repurposes the `<ErrorState>` component for an application error boundary.

## Examples

### Error boundary usage example

A basic error boundary appears when an error is thrown inside of the wrapped content.

The component itself has a `headerTitle`, an `errorTitle`, and shows an en error stack with details.

```js file="./ErrorBoundaryExample.tsx"

```

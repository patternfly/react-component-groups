---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: ErrorBoundary
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['ErrorBoundary']
---

import { ErrorBoundary } from "@patternfly/react-component-groups";

## Component usage

This component reuses the ErrorState component for an app error boundary.

### ErrorBoundary component

```js file="./ErrorBoundaryExample.tsx"

```

### ErrorBoundary component without error

```js file="./ErrorBoundaryNoExample.tsx"

```
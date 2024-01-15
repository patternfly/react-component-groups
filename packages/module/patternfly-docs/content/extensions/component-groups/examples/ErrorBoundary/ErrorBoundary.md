---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
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

import ErrorBoundary from "@patternfly/react-component-groups/dist/dynamic/ErrorBoundary";

The **error boundary** component repurposes the `<ErrorState>` component for an application error boundary.

## Examples 

### Basic error boundary 

A basic error boundary has a `headerTitle`, an `errorTitle`, and lists error details when a user takes action (like selecting a link).

```js file="./ErrorBoundaryExample.tsx"

```

### Error boundary without error

If you do not wish to share error details, you can remove `throw new Error("");` and share other content instead.


```js file="./ErrorBoundaryNoExample.tsx"

```

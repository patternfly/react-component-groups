---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Error state
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['ErrorState']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ErrorState/ErrorState.md
---

import ErrorState from "@patternfly/react-component-groups/dist/dynamic/ErrorState";

The **error state** component repurposes the `EmptyState` component to display an error to users. To further customize this component, you can also utilize all properties of the [empty state component](/components/empty-state), with the `exception` of `children`.

## Examples

### Basic error state

To provide users with error details, a basic error state should contain an appropriate and informative `errorTitle` and `errorDescription`. 

```js file="./ErrorStateExample.tsx"

```

### Custom footer

To override the default action button, specify your own using `customFooter`. 

```js file="./ErrorStateFooterExample.tsx"

```

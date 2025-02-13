---
# Sidenav top-level section
# should be the same for all markdown files
section: Component groups
subsection: Status and state indicators
# Sidenav secondary level section
# should be the same for all markdown files
id: Stale data warning
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['StaleDataWarning']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/StaleDataWarning/StaleDataWarning.md
---

import StaleDataWarning from '@patternfly/react-component-groups/dist/dynamic/StaleDataWarning';

A **stale data warning** component displays a warning status when an object is stale and planned for removal. Additional warning details can be displayed as a tooltip or text label. 

## Examples

### Basic stale data warning example

A basic stale data warning component displays a warning icon with additional details in a tooltip, including a timeline for data removal. 

```js file="./StaleDataWarningExample.tsx"

```

### Stale data warning with customized props

Instead of sharing details in a tooltip, you can place a short message beside the icon. You can still utilize all properties of the [tooltip component](/components/tooltip), with the exception of `content`.

```js file="./StaleDataWarningCustomExample.tsx"

```
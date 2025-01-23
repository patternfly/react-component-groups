---
# Sidenav top-level section
# should be the same for all markdown files
section: Component groups
subsection: Status and state indicators
# Sidenav secondary level section
# should be the same for all markdown files
id: Culling information
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['CullingInformation']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/CullingInfo/CullingInfo.md
---

import CullingInformation from '@patternfly/react-component-groups/dist/dynamic/CullingInfo';

A **culling information** component displays a warning for when an object will become culled or stale. It can display this as a tooltip or text. 

## Examples

### Basic culling information

A basic culling information example

```js file="./CullingInfoExample.tsx"

```

### Culling information with customized props

For further customization, you can choose to render the tooltip as a message beside the icon instead. And you can utilize all properties of the [Tooltip component](/components/tooltip), with the exception of `content`.

```js file="./CullingInfoCustomExample.tsx"

```
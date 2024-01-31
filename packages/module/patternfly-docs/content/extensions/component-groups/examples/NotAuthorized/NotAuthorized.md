---
section: extensions
subsection: Component groups
id: Not authorized
source: react
propComponents: ['NotAuthorized']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/NotAuthorized/NotAuthorized.md
---

import NotAuthorized from "@patternfly/react-component-groups/dist/dynamic/NotAuthorized";

A **not authorized** component displays an error screen to users when they attempt to view a page that they don't have permission to access. To further customize this component, you can also utilize all properties of the [empty state component](/components/empty-state), with the exception of `children` and `title`.

## Examples

### Basic not authorized

A basic not authorized component displays a title, a description, and custom actions. 

```js file="./NotAuthorizedDefaultExample.tsx"

```

### Not authorized with custom actions

You can customize the not authorized component to fit your use case by specifying the `serviceName` to appear in the title, the `description` to provide appropriate context for the error, and the `actions` that a user can take instead.

```js file="./NotAuthorizedCustomExample.tsx"

```

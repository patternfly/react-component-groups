---
section: Component groups
subsection: Controls
id: External link button
source: react
propComponents: ['ExternalLinkButton']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ExternalLinkButton/ExternalLinkButton.md
---

import ExternalLinkButton from "@patternfly/react-component-groups/dist/dynamic/ExternalLinkButton"

The **external link button** component is a button that opens links in an external tab. To further customize this component, you can also utilize all properties of the [button component](/components/button).

## Examples

### Basic external link button

In order to display a basic external link button, you can use the `href` property to specify the URL and the `variant` property to set the button style.

```js file="./ExternalLinkButtonExample.tsx"

```

### Inline external link button

You may use the external link button component inline with other text by using the `inline` property.

```js file="./ExternalLinkButtonInlineExample.tsx"

```

### Passing props to the icon

You may pass props to the icon using the `iconProps` property. This is useful for customizing the title of the icon for enhanced screen reader support.

```js file="./ExternalLinkButtonIconPropsExample.tsx"

```

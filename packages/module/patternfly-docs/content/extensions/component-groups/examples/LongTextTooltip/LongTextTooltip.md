---
section: extensions
subsection: Component groups
id: Long text tooltip
source: react
propComponents: ['LongTextTooltip']
---

import LongTextTooltip from "@patternfly/react-component-groups/dist/dynamic/LongTextTooltip";

The **long text tooltip** component is a tooltip that can be used to display long text to users. It uses the `Tooltip` component to display the truncated text passed in as `content`. It uses  `maxLength` prop to control the size of the content, and the `Tooltip` component to display the rest of the content.

## Examples

### LongTextTooltip component

To provide users with long text, a basic long text tooltip should contain an appropriate and informative `content` and `maxLength`.  Additionally you can pass in a `tooltipPosition` to control the position of the tooltip, and `tooltipMaxWidth` to control the tool tip width.

```js file="./LongTextTooltipExample.tsx"

```

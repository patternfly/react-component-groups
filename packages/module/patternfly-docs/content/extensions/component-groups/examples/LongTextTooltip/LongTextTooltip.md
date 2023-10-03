---
section: extensions
subsection: Component groups
id: Long-text tooltip
source: react
propComponents: ['LongTextTooltip']
---

import LongTextTooltip from "@patternfly/react-component-groups/dist/dynamic/LongTextTooltip";

The **long-text tooltip** component enables you to display long text to users via a tooltip. It builds off of the [tooltip component](/components/tooltip) to truncate UI text in an element and display the truncated text in a tooltip. 

## Examples

### Basic long-text tooltip

To show users the full value of truncated content, a basic long-text tooltip should contain appropriate and informative `content` and specify the `maxLength` of the UI text (after which, truncation will occur).  

Additionally you can pass in a `tooltipPosition` to control the position of the tooltip, and `tooltipMaxWidth` to control the tool tip width.

```js file="./LongTextTooltipExample.tsx"

```

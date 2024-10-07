---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Responsive actions
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['ResponsiveAction', 'ResponsiveActions']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ResponsiveActions/ResponsiveActions.md
---
import { useState } from 'react';
import { ResponsiveAction } from '@patternfly/react-component-groups/dist/dynamic/ResponsiveAction';
import { ResponsiveActions } from '@patternfly/react-component-groups/dist/dynamic/ResponsiveActions';

The **responsive actions** component allows for the display of actions in a responsive layout. Actions can be presented as persistent, pinned or collapsed to dropdown.

The `ResponsiveAction` component is used to declare individual actions within the `ResponsiveActions` wrapper. Each action can be displayed as a standalone button or dropdown based on `isPinned` and `isPersistent` properties. Persistent actions are always separate buttons no matter of the screen size. Pinned actions are rendered as buttons as well, but when the screen size is below the defined breakpoint, they get collapsed to the actions dropdown. Other actions render in a dropdown on all screen sizes.

## Examples

### Basic responsive actions

This example demonstrates how to create responsive actions with persistent and pinned actions.


```js file="./ResponsiveActionsExample.tsx"

```

### Breakpoint on container

By passing in the `breakpointReference` property, the overflow menu's breakpoint will be relative to the width of the reference container rather than the viewport width.

You can change the container width in this example by adjusting the slider. As the container width changes, the actions will change their layout despite the viewport width not changing.


```js file="./ResponsiveActionsBreakpointExample.tsx"

```

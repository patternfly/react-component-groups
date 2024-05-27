---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Status
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['Status']
beta: true
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Status/Status.md
---
import { BanIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons/';
import { Status, StatusVariant } from '@patternfly/react-component-groups/dist/dynamic/Status';

The **status** component's purpose is to display status with icon and text to the user. 

### Basic status

Status component consinsts of an icon configured using `icon` and a message, specified with `label`. 

```js file="./StatusExample.tsx"

```

### Status with description

Optionally a description can be displayed by passing it to the `description` property.

```js file="./StatusDescriptionExample.tsx"

```

### Icon only status

The `iconOnly` flag allows to hide the status message and show only an icon with a tooltip.

```js file="./IconOnlyStatusExample.tsx"

```

### Link status

You can use the link `variant` to display the link button status.

```js file="./LinkStatusExample.tsx"

```

### Popover status

You can use popover `variant` to display the status details in a popover.

```js file="./PopoverStatusExample.tsx"

```

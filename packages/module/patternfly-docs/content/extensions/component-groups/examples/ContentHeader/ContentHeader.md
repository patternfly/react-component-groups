---
section: extensions
subsection: Component groups
id: Content header
source: react
propComponents: ['ContentHeader']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ContentHeader/ContentHeader.md
---

import ContentHeader from "@patternfly/react-component-groups/dist/dynamic/ContentHeader"
import { EllipsisVIcon } from '@patternfly/react-icons';
import contentHeaderIcon from '../../assets/icons/content-header-icon.svg'

The **content header** component displays a page header section with a title, subtitle and other optional content.

## Examples

### Basic content header

In order to display a basic content header, pass the `title` and `subtitle`.

```js file="./ContentHeaderExample.tsx"

```

### Content header with breadcrumbs

You can display breadcrumbs above the title using the `breadcrumbs` property.

```js file="./ContentHeaderBreadCrumbExample.tsx"

```

### Content header with icon

Use the `icon` property to display your custom page icon separated with a [divider](/components/divider).

```js file="./ContentHeaderIconExample.tsx"

```

### Content header with label and link

To add specific element captions for user clarity and convenience, you can use the `label` property together with [label](/components/label) or your custom component. The `linkProps` can be used to define a link displayed under the subtitle.

```js file="./ContentHeaderLabelLinkExample.tsx"

```

### Content header with actions menu

In case you want to display actions in your header, you can use the `actionsMenu` property.

```js file="./ContentHeaderActionsExample.tsx"

```
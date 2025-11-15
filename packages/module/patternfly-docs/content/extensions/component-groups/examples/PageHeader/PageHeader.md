---
section: extensions
subsection: component-groups
id: Page header
source: react
propComponents: ['PageHeader']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/PageHeader/PageHeader.md
---

import PageHeader from "@patternfly/react-component-groups/dist/dynamic/PageHeader"
import { EllipsisVIcon } from '@patternfly/react-icons';
import pageHeaderIcon from '../../assets/icons/page-header-icon.svg'
import { Fragment, FunctionComponent, MouseEvent, Ref, useState } from 'react';

The **page header** component displays a page header section with a title, subtitle and other optional content.

## Examples

### Basic page header

In order to display a basic page header, pass the `title` and `subtitle`.

```js file="./PageHeaderExample.tsx"

```

### Page header with breadcrumbs

You can display breadcrumbs above the title using the `breadcrumbs` property.

```js file="./PageHeaderBreadcrumbExample.tsx"

```

### Page header with icon

Use the `icon` property to display your custom page icon separated with a [divider](/components/divider).

```js file="./PageHeaderIconExample.tsx"

```

### Page header with label and link

To add specific element captions for user clarity and convenience, you can use the `label` property together with [label](/components/label) or your custom component. The `linkProps` can be used to define a link displayed under the subtitle.

```js file="./PageHeaderLabelLinkExample.tsx"

```

### Page header with actions menu

In case you want to display actions in your header, you can use the `actionsMenu` property.

```js file="./PageHeaderActionsExample.tsx"

```

---
# Sidenav top-level section
# should be the same for all markdown files
section: Extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Skeleton table
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['SkeletonTable', 'SkeletonTableHead', 'SkeletonTableBody']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/SkeletonTable/SkeletonTable.md
---

import { RowSelectVariant, TableVariant, Table } from '@patternfly/react-table';
import SkeletonTable from '@patternfly/react-component-groups/dist/dynamic/SkeletonTable';
import SkeletonTableHead from '@patternfly/react-component-groups/dist/dynamic/SkeletonTableHead';
import SkeletonTableBody from '@patternfly/react-component-groups/dist/dynamic/SkeletonTableBody';
import { FC, ReactNode, useState, useEffect } from 'react';

The **skeleton table** component is used to display placeholder "skeletons" within a table as its contents load.

## Examples

### Basic skeleton table

To indicate that a table's cells are still loading, a basic skeleton table uses the [skeleton](https://www.patternfly.org/components/skeleton) component to place a placeholder skeleton in each cell. Once the data is loaded, the skeleton table is replaced with a table containing the real data.

```js file="./SkeletonTableExample.tsx"

```

### Compact skeleton table

The skeleton table can be displayed as a compact table by setting the `variant` prop to `compact`. Borders can be toggled off by setting `borders` to `false`.

```js file="./SkeletonTableCompactExample.tsx"

```

### Selectable columns

The skeleton table can display selectable columns by setting the `isSelectable` prop to `true`. The `selectVariant` prop determines if radio buttons or checkboxes are used.

```js file="./SkeletonTableSelectableExample.tsx"

```

### Expandable rows

The skeleton table can display the indicator for expandable rows by setting the `isExpandable` prop to `true`.

```js file="./SkeletonTableExpandableExample.tsx"

```

### Customizable column headers

Custom column headers can be provided by passing an array of strings or `Th` components to the `columns` prop instead of an array of strings. This allows you to support sorting on columns, add custom content, or style the column headers.

```js file="./SkeletonTableCustomExample.tsx"

```

### Full loading simulation

The following example demonstrates the typical behavior of a skeleton table transitioning to a normal table as the data becomes available.

To simulate this loading process, click the "Reload table" button and wait for the data to populate.

```js file="./SkeletonTableLoadingExample.tsx"

```

### Skeleton table head

You can render only the `<Thead>` part of the skeleton table by using the `<SkeletonTableHead/>`.

```js file="./SkeletonTableHeadExample.tsx"

```

### Skeleton table body

You can also render only the `<Tbody>` part of the skeleton table by using the `<SkeletonTableBody/>`.

```js file="./SkeletonTableBodyExample.tsx"

```

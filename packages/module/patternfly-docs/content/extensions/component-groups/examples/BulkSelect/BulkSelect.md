---
# Sidenav top-level section
# should be the same for all markdown files
section: Component groups
subsection: Controls
# Sidenav secondary level section
# should be the same for all markdown files
id: Bulk select
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['BulkSelect']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/BulkSelect/BulkSelect.md
---
import { useState } from 'react';
import { BulkSelect, BulkSelectValue } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';

The **bulk select** provides a way of selecting data records in batches. You can select all data at once, all data on current page or deselect all.

## Examples

### Basic paginated bulk select

To display a default bulk select, you need to pass number of selected items using `selectedCount`, the `onSelect` callback accepting bulk select option values and selecting data accordingly, `pageCount` defining number of items on the current page, `pageSelected` and `pagePartiallySelected` boolean flags to define the state os the bulk select checkbox..

```js file="./BulkSelectExample.tsx"

```

### Bulk select with all option

To display an option for selecting all data at once, pass `canSelectAll` flag together with `totalCount` of data entries. You can also remove the page select option by setting `isDataPaginated` to `false`,

```js file="./BulkSelectAllExample.tsx"

```

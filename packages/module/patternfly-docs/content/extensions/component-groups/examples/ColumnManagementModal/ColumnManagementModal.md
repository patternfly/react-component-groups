---
# Sidenav top-level section
# should be the same for all markdown files
section: Component groups
subsection: Helpers
# Sidenav secondary level section
# should be the same for all markdown files
id: Column management modal
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['ColumnManagementModal']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ColumnManagementModal/ColumnManagementModal.md
---

import ColumnManagementModal from '@patternfly/react-component-groups/dist/dynamic/ColumnManagementModal';
import { ColumnsIcon } from '@patternfly/react-icons';
import { FunctionComponent, useState } from 'react';

The **column management modal** component can be used to implement customizable table columns. Columns can be configured to be enabled or disabled by default or be unhidable.

## Examples

### Showing and hiding of table columns

Clicking the "Manage columns" button will open the column management modal. The "ID" column should not be toggleable, therefore its checkbox is disabled with `isUntoggleable: true`. The "Score" column is set to be hidden by default. Always make sure to set `isShownByDefault` and `isShown` to the same boolean value in the initial state. For further customization, you can utilize all properties of the [modal component](/components/modal), except `ref` and `children`.

```js file="./ColumnManagementModalExample.tsx"

```

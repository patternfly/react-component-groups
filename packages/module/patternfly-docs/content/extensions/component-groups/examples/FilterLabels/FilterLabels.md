---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Filter labels
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['FilterLabels']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/FilterLabels/FilerLabels.md
---
import { useState } from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { FilterLabels, isFilterLabel } from '@patternfly/react-component-groups/dist/dynamic/FilterLabels';

The **filter labels** component provides a way of displaying filters applied to your data in groups consisting of labels. The component also supports deleting individual labels or label groups, and provides options for customizing the layout and functionality.

## Examples

### Basic filter labels

To display basic filter labels, pass an array of `filters` containing either individual `FilterLabel` or grouped `FilterLabelGroup` objects - based on the [chip](/components/chip) and [chip group](/components/chip#chip-groups) props. The `onDelete` function is used to handle the removal of labels.

Filter labels can display an optional count badge using the `count` property of `FilterLabel`. This can be useful for showing the number of items associated with each filter.


```js file="./FilterLabelsExample.tsx"

```

### Delete options customization

To hide the "Clear filters" button that removes all filter labels, set the `showDeleteAllButton` property to `false`. You can also customize the button label with the `deleteAllButtonTitle` property. 

To display buttons for deletion of entire groups of filter labels, set the `showDeleteGroupButton` property to `true`. Your `onDelete` function then needs to handle the group deletion.


```js file="./FilterLabelsDeleteExample.tsx"

```

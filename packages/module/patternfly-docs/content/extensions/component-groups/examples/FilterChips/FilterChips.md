---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Filter chips
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['FilterChips']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/FilterChips/FilterChips.md
---
import { useState } from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { FilterChips, FilterChip, FilterChipGroup, FilterChipsFilter } from '@patternfly/react-component-groups/dist/dynamic/FilterChips';

The **filter chips** provides a way of displaying filters applied to your data in groups consisting of chips. 

## Examples

### Basic filter chips

Some text

```js file="./FilterChipsExample.tsx"

```

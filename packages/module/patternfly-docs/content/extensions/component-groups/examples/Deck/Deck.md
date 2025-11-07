---
# Sidenav top-level section
# should be the same for all markdown files
section: Component groups
subsection: Content containers
# Sidenav secondary level section
# should be the same for all markdown files
id: Deck
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['Deck', 'DeckPage', 'DeckButton']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Deck/Deck.md
---

import Deck from '@patternfly/react-component-groups/dist/dynamic/Deck';
import { FunctionComponent, useState } from 'react';

The **deck** component is a compact, sequential container for presenting a suite of static announcements or an informational walkthrough. It is not intended for task completion or form-filling workflows.

## Examples

### Basic deck

This example demonstrates the basic deck with automatic navigation. Buttons can use the `navigation` prop to automatically handle page changes:
- `navigation: 'next'` - Advances to the next page
- `navigation: 'previous'` - Goes back to the previous page  
- `navigation: 'close'` - Triggers the onClose callback

You can also add custom `onClick` handlers for analytics, validation, or other logic. The custom `onClick` will be called **before** the automatic navigation occurs.

```ts file="./DeckExample.tsx"

```


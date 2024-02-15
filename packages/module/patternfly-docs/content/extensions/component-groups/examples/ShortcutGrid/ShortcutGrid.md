---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Shortcut grid
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: [
    'ShortcutGrid',
    'Shortcut'
]
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/ShortcutGrid/ShortcutGrid.md
---

import ShortcutGrid from '@patternfly/react-component-groups/dist/dynamic/ShortcutGrid';
import Shortcut from '@patternfly/react-component-groups/dist/dynamic/Shortcut';

A **shortcut grid** component displays keyboard shortcuts with their description in a grid.

## Examples

### Basic shortcut grid

A basic shortcut grid can be used to display shortcuts available to the user together with their description. 

You can customize displayed shortcuts using `shortcuts` props. For mouse actions with given shortcuts, there are separate props to be enabled. You can customize showing symbols for control keys using `showSymbols`. The component also accepts all properties of the [grid layout](/layouts/grid).

```js file="./ShortcutGridExample.tsx"

```

### Single shortcut

Shortcut component can be also used outside of the grid. 

Appearance of the component can be customized using the `className` property.

```js file="./ShortcutExample.tsx"

```



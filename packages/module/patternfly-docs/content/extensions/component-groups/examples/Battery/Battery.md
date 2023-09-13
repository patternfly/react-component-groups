---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Battery
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['Battery']
---

import Battery from '@patternfly/react-component-groups/dist/dynamic/Battery';


This is the battery component that generates a 'battery' which corresponds to a level 1-4.
- 1 - low, green (best case scenario)
- 2 - medium, yellow
- 3 - high, orange
- 4 - critical, red (worst case scenario)

Also accepts a label which can be made invisible.


## Component usage

### Low severity

```js file="./BatteryLowExample.tsx"

```

### Medium severity

```js file="./BatteryMediumExample.tsx"

```

### High severity

```js file="./BatteryHighExample.tsx"

```

### Critical severity

```js file="./BatteryCriticalExample.tsx"

```

### Default variant

```js file="./BatteryDefaultExample.tsx"

```

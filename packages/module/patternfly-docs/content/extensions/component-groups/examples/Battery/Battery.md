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
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Battery/Battery.md
---

import Battery, { BatterySeverity } from '@patternfly/react-component-groups/dist/dynamic/Battery';

The **battery** component generates a battery, which corresponds to a level `low`, `medium`, `high` or `critical`. Each level corresponds with a severity level and respective color:

| Severity level | Meaning | Style | 
| --- | --- | --- | 
| Level 1 | Low severity (best case scenario) | 1 green bar | "1", "low" |
| Level 2 | Medium severity |  2 yellow bars | 
| Level 3 | High severity | 3 orange bars | 
| Level 4 | Critical severity (worst case scenario) | 4 red bars | 

To specify the severity of the battery's risk level, you can pass a predefined enum or text value into the `severity` property that corresponds to the appropriate severity level.

To add an optional label to a battery, add the `label` property to the `<Battery>` component.

## Examples

### Default variant

The default style of a battery (4 black lines) appears when any value besides "low", "medium", "high", or "critical" is passed to `severity`. 

```js file="./BatteryDefaultExample.tsx"

```

### Low severity

To style a battery as low severity, pass "low" or `BatterySeverity.low` to `severity`.

```js file="./BatteryLowExample.tsx"

```

### Medium severity

To style a battery as medium severity, pass "medium", or `BatterySeverity.medium` to `severity`.

```js file="./BatteryMediumExample.tsx"

```

### High severity

To style a battery as high severity, pass "high", or `BatterySeverity.high` to `severity`.

```js file="./BatteryHighExample.tsx"

```

### Critical severity

To style a battery as critical severity, pass "critical" or `BatterySeverity.critical` to `severity`.

```js file="./BatteryCriticalExample.tsx"

```
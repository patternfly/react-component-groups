---
# Sidenav top-level section
# should be the same for all markdown files
section: Component groups
subsection: Status and state indicators
# Sidenav secondary level section
# should be the same for all markdown files
id: Severity
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['Severity']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Severity/Severity.md
---

import Severity, { SeverityType } from '@patternfly/react-component-groups/dist/dynamic/Severity';

The **battery** component generates a battery, which corresponds to a level `low`, `medium`, `high` or `critical`. Each level corresponds with a severity level and respective color:

| Severity level | Meaning | Style | 
| --- | --- | --- | 
| Level 1 | Low severity (best case scenario) | 1 green bar | "1", "low" |
| Level 2 | Medium severity |  2 yellow bars | 
| Level 3 | High severity | 3 orange bars | 
| Level 4 | Critical severity (worst case scenario) | 4 red bars | 

To specify the severity of the battery's risk level, you can pass a predefined enum or text value into the `severity` property that corresponds to the appropriate severity level.

To add an optional label to a battery, add the `label` property to the `<Severity>` component.

## Examples

### Undefined variant

The default style for the severity component appears when any value besides "none", "low", "medium", "high", or "critical" is passed to `Severity`. 

```js file="./SeverityUndefinedExample.tsx"

```
### None severity

To style no severity, pass "none" or `SeverityType.none` to `severity`.

```js file="./SeverityNoneExample.tsx"

```

### Minor severity

To style a minor severity, pass "minor" or `SeverityType.minor` to `severity`.

```js file="./SeverityMinorExample.tsx"

```

### Moderate severity

To style a moderate severity, pass "moderate", or `SeverityType.moderate` to `severity`.

```js file="./SeverityModerateExample.tsx"

```

### Important severity

To style an important severity, pass "important", or `SeverityType.important` to `severity`.

```js file="./SeverityImportantExample.tsx"

```

### Critical severity

To style a critical severity, pass "critical" or `SeverityType.critical` to `severity`.

```js file="./SeverityCriticalExample.tsx"

```
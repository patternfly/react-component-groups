---
# Sidenav top-level section
# should be the same for all markdown files
section: Extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Log snippet
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['LogSnippet']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/LogSnippet/LogSnippet.md
---

import LogSnippet from '@patternfly/react-component-groups/dist/dynamic/LogSnippet';
import { FunctionComponent } from 'react';

A **log snippet** component provides a way to display a log snippet or code along with a message.

## Examples

### Basic log snippet

The log snippet supports several variants configurable using `variant` property for different scenarios. Each variant has an associated status icon and color similar to [alert component](/components/alert).

```js file="./LogSnippetExample.tsx"

```

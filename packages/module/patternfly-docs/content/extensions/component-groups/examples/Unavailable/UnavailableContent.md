---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Unavailable content
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['UnavailableContent']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Unavailable/UnavailableContent.md
---

import UnavailableContent from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent';

An **unavailable content** component displays a screen to users when they attempt to view a page that is currently unavailable to view.

## Examples

### Basic unavailable content

A basic unavailable content component provides users with instructions, including a link to check a status page for known issues.
The status page link can be specified using `statusPageUrl`.

```js file="./UnavailableContentExample.tsx"

```

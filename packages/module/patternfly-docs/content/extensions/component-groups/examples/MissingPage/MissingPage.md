---
# Sidenav top-level section
# should be the same for all markdown files
section: Extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Missing page
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['MissingPage']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/MissingPage/MissingPage.md
---

import MissingPage from '@patternfly/react-component-groups/dist/dynamic/MissingPage';
import { FunctionComponent } from 'react';

The **missing page** component can be used to display an error message and "return to homepage" button when an error occurs.

## Examples

### Basic missing page

A basic missing page component informs users that an error has occurred. It also includes a button link, which users can select to return to the homepage.

```js file="./MissingPageExample.tsx"

```

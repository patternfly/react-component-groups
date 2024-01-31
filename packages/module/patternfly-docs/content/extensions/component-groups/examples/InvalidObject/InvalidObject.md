---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Invalid object
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['InvalidObject']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/InvalidObject/InvalidObject.md
---

import InvalidObject from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';

The **invalid object** component can be used to display an error message and "return to homepage" button when an error occurs.

## Examples

### Basic invalid object 

A basic invalid object throws an error and informs users that an error has occurred. It also includes a button link, which users can select to return to the homepage.  

```js file="./InvalidObjectExample.tsx"

```
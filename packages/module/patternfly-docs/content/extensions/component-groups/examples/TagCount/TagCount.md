---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Tag count
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['TagCount']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/TagCount/TagCount.md
---
import TagCount from '@patternfly/react-component-groups/dist/dynamic/TagCount';

The **tag count** component generates a tag icon that displays a number, which represents a count value. 

## Examples

### Basic tag count

A basic tag count uses the `count` property to display the number of tagged items.

```js file="./TagCountExample.tsx"

```

### Disabled tag count

When no value is provided to a tag count component, it will be styled as disabled.

```js file="./TagCountDisabledExample.tsx"

```

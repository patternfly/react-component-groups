---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Skeleton table
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['SkeletonTable']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Skeleton/Skeleton.md
---
import SkeletonTable from '@patternfly/react-component-groups/dist/dynamic/SkeletonTable';

The **skeleton table** component is used to display placeholder "skeletons" within a table as its contents load.

## Examples

### Basic skeleton table

To indicate that a table's cells are still loading, a basic skeleton table uses the [skeleton](https://www.patternfly.org/components/skeleton) component to place a placeholder skeleton in each cell. Once the data is loaded, the skeleton table is replaced with a table containing the real data.

```js file="./SkeletonTableExample.tsx"

```

### Full loading simulation

The following example demonstrates the typical behavior of a skeleton table transitioning to a normal table as the data becomes available.

To simulate this loading process, select the `Reload table` button and wait for the data to populate.


```js file="./SkeletonTableLoadingExample.tsx"

```

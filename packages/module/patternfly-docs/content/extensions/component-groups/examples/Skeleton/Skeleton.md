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
---
import SkeletonTable from '@patternfly/react-component-groups/dist/dynamic/SkeletonTable';

The skeleton table is used to handle the loading of a table.  It indicates data for each of the rows are loading by
using the [skelton](https://www.patternfly.org/components/skeleton) component in each cell. Once the data is loaded, the
skeleton table should be replaced with the table component containing the real data.

## Examples

### Basic skeleton table

The following is a basic example of a skeleton table.

```js file="./SkeletonTableExample.tsx"

```

### Skelton Table loading and replaced with table component

This example shows how to use the skeleton table to indicate the data is loading, and then replace it with the table component once the data is available.
To simulate the loading of the table use the `Load Table` button below the table.

```js file="./SkeletonTableLoadingExample.tsx"

```

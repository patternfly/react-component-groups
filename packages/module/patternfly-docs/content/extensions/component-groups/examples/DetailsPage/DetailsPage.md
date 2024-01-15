---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Details page
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: [
  'DetailsPage', # No output --> see https://github.com/patternfly/patternfly-org/issues/3423
  'DetailsPageHeader',
  'PageHeading',
  # 'PageHeadingLabel', # No output --> is a type and not an interface
  'ActionButton',  # Incomplete output --> see https://github.com/patternfly/patternfly-org/issues/3423
  # 'ActionCTA', # No output --> is a type and not an interface
  'ActionMenu',
  'GroupedActionsProps', # Removing 'Props' breaks linking from ActionProps
  'ActionProps',  # Removing 'Props' breaks output
  'HorizontalNavProps', # Removing 'Props' breaks linking to TabProps
  # 'Tab', # No output --> is a type and not an interface
]
beta: true
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/DetailsPage/DetailsPage.md
---

import { ActionMenu } from '@patternfly/react-component-groups';
import { BrowserRouter as Router } from 'react-router-dom';
import { CheckCircleIcon } from '@patternfly/react-icons';
import HorizontalNav from '@patternfly/react-component-groups/dist/dynamic/HorizontalNav';
import DetailsPage from '@patternfly/react-component-groups/dist/dynamic/DetailsPage';
import DetailsPageHeader from'@patternfly/react-component-groups/dist/dynamic/DetailsPageHeader';

A **details page** component is used to provide users with details on a resource that they access.

## Examples

### Basic details page

A basic details page typically contains elements like `breadcrumbs`, a `pageHeading`, actions, and `tabs`.

Details page content should be customized within the appropriate tab to fit your use case.

```js file="./DetailsPageExample.tsx"

```

### Details page header

The `pageHeader` for a details page contains the `breadcrumbs`, `pageHeading`, and any actions.

```js file="./DetailsPageHeaderExample.tsx"

```

### Details page action menu 

The details page action menu contains multiple actions that users can take.

```js file="./ActionMenuExample.tsx"

```

### Details page action menu with grouped actions 

To group related actions in a details page action menu, use the `groupedActions` property.

```js file="./ActionMenuGroupedExample.tsx"

```

### Details page horizontal navigation

A details page places `tabs` in a `<HorizontalNav>` component.

```js file="./HorizontalNavExample.tsx"

```

---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: react-component-groups
# Sidenav secondary level section
# should be the same for all markdown files
id: DetailsPage
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: [
  'DetailsPage', # No output --> see https://github.com/patternfly/patternfly-org/issues/3423
  'DetailsPageHeader',
  'PageHeading',
  # 'PageHeadingLabel', # No output --> is a type and not an interface
  'Breadcrumbs',
  # 'Breadcrumb', # No output --> is a type and not an interface
  'ActionButtons',
  'ActionButton',  # Incomplete output --> see https://github.com/patternfly/patternfly-org/issues/3423
  # 'ActionCTA', # No output --> is a type and not an interface
  'ActionMenu',
  'GroupedActionsProps', # Removing 'Props' breaks linking from ActionProps
  'ActionProps',  # Removing 'Props' breaks output
  'HorizontalNavProps', # Removing 'Props' breaks linking to TabProps
  # 'Tab', # No output --> is a type and not an interface
]
beta: true
---

import { ActionButtons } from '@patternfly/react-component-groups';
import { ActionMenu } from '@patternfly/react-component-groups';
import { Breadcrumbs } from '@patternfly/react-component-groups';
import { BrowserRouter as Router } from 'react-router-dom';
import { CheckCircleIcon } from '@patternfly/react-icons';
import { DetailsPage } from'@patternfly/react-component-groups';
import { DetailsPageHeader } from'@patternfly/react-component-groups';
import { HorizontalNav } from '@patternfly/react-component-groups';

## Components Usage

### DetailsPage Component

```js file="./DetailsPageExample.tsx"

```

### DetailsPageHeader Component

```js file="./DetailsPageHeaderExample.tsx"

```

### Breadcrumbs Component

```js file="./BreadcrumbsExample.tsx"

```

### ActionButtons Component

```js file="./ActionButtonsExample.tsx"

```

### ActionMenu Component

```js file="./ActionMenuExample.tsx"

```

### ActionMenu with groupedActions Component

```js file="./ActionMenuGroupedExample.tsx"

```

### HorizonalNav Component

```js file="./HorizontalNavExample.tsx"

```

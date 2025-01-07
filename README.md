# PatternFly React Component Groups

This repo contains a set of opinionated react component groups used to standardize functionality and look and feel across products. The components are based on PatternFly with some additional functionality.

### Branches
`main` - PatternFly 6 implementation

`v5` - PatternFly 5 implementation

`do-not-delete` - do not delete

> NOTE: If new features are not needed in `v5,` they should be added directly to the `main` branch. For bug fixes, it is preferred to fix the bug for both versions (fix in one branch and cherry-pick to another). Pulling new changes from 5 to 6 and vice versa is not recommended using `rebase`. Rather, always cherry-pick specific commits.

---

### Migration from [RedHatInsights/frontend-components](https://github.com/RedHatInsights/frontend-components) to [patternfly/react-component-groups](https://github.com/patternfly/react-component-groups)
Please see the [migration guide](./migration.md)

---
## Contribution guide

### Before adding a new component:
- make sure your use case is new/complex enough to be added to this extension
- the component should bring a value value above and beyond existing PatternFly components

### To add a new component:
1. create a folder in `src/` matching its name (for example `src/MyComponent`)
2. to the new folder add a new `.tsx` file named after the component (for example `src/MyComponent/MyComponent.tsx`)
3. to the same folder include an `index.ts` which will export the component as a default and then all necessary interfaces
4. if this file structure is not met, your component won't be exposed correctly

#### Example component:
```
import * as React from 'react';
import { Content } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

// do not forget to export your component's interface
// always place the component's interface above the component itself in the code
export interface MyComponentProps {
  text: String;
}

const useStyles = createUseStyles({
  myText: {
    fontFamily: 'monospace',
    fontSize: 'var(--pf-v6-global--icon--FontSize--md)',
  },
})

// do not use the named export of your component, just a default one
const MyComponent: React.FunctionComponent<MyComponentProps> = () => {
  const classes = useStyles();

  return (
    <Content className={classes.myText}>
      This is my new reusable component
    </Content>
  );
};

export default MyComponent;
``` 

#### Index file example:
```
export { default } from './MyComponent';
export * from './MyComponent';
``` 

#### Component directory structure example:
```
src
|- MyComponent
   |- index.ts
   |- MyComponent.tsx
``` 

### Component's API rules:
- prop names comply with PatternFly components naming standards (`variant`, `onClick`, `position`, etc.)
- the API is maximally simplified and all props are provided with a description
- it is built on top of existing PatternFly types without prop omitting
- it is well documented using the PatternFly documentation (`/packages/module/patternfly-docs/content/extensions/component-groups/examples/MyComponent/MyComponent.md`) with examples of all possible use cases (`packages/module/patternfly-docs/content/extensions/component-groups/examples/MyComponent/MyComponent[...]Example.tsx`)
- do not unnecessarily use external libraries in your component - rather, delegate the necessary logic to the component's user using the component's API

#### Component API definition example:
```
// when possible, extend available PatternFly types
export interface MyComponentProps extends ButtonProps {
    customLabel: Boolean
};

export const MyComponent: React.FunctionComponent<MyComponentProps> = ({ customLabel, ...props }) => ( ... );
```


#### Markdown file example:
```
---
section: Component groups
subsection: My component's category
id: MyComponent
propComponents: ['MyComponent']
---

import MyComponent from "@patternfly/react-component-groups/dist/dynamic/MyComponent";

## Component usage

MyComponent has been created to demo contributing to this repository.

### MyComponent component example label

```js file="./MyComponentExample.tsx"```

```

#### Component usage file example: (`MyComponentExample.tsx`)
```
import React from 'react';

const MyComponentExample: React.FunctionComponent = () => (
  <MyComponent customLabel="My label">
);

export default MyComponentExample;
```

### Sub-components:
When adding a component for which it is advantageous to divide it into several sub-components make sure: 
- component and all its sub-components are located in separate files and directories straight under the `src/` folder
- sub-components are exported and documented separately from their parent
- parent component should provide a way to pass props to all its sub-components

The aim is to enable the user of our "complex" component to use either complete or take advantage of its sub-components and manage their composition independently.

### Testing:
When adding/making changes to a component, always make sure your code is tested:
- use React Testing Library for unit testing 
- add unit tests to a `[ComponentName].test.tsx` file to your component's directory
- make sure all the core functionality is covered using Cypress component or E2E tests
- add component tests to `cypress/component/[ComponentName].cy.tsx` file and E2E tests to `cypress/e2e/[ComponentName].spec.cy.ts`
- add `ouiaId` to the component props definition with a default value of the component name (for subcomponents, let's use `ComponentName-element-specification` naming convention e.g. `ouiaId="WarningModal-confirm-button"`)

### Styling:
- for styling always use JSS
- new classNames should be named in camelCase starting with the name of a given component and following with more details clarifying its purpose/component's subsection to which the class is applied (`actionMenu`, `actionMenuDropdown`, `actionMenuDropdownToggle`, etc.)
- do not use `pf-v6-u-XXX` classes, use CSS variables in a custom class instead (styles for the utility classes are not bundled with the standard patternfly.css - it would require the consumer to import also addons.css)

## Building for production

- run `npm install`
- run `npm run build`

## Development
- run `npm install`
- run `npm run start` to build and start the development server

## Testing and Linting
- run `npm run test` to run the unit tests
- run `npm run cypress:run:cp` to run Cypress component tests
- run `npm run cypress:run:e2e` to run Cypress E2E tests
- run `npm run lint` to run the linter

## A11y testing

- run `npm run build:docs` followed by `npm run serve:docs`, then run `npm run test:a11y` in a new terminal window to run our accessibility tests for the components. Once the accessibility tests have finished running you can run `npm run serve:a11y` to locally view the generated report.


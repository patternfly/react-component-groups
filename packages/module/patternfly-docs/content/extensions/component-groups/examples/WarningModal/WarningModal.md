---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Warning modal
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['WarningModal']
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/WarningModal/WarningModal.md
---

import WarningModal from '@patternfly/react-component-groups/dist/dynamic/WarningModal';

A **warning modal** component displays a modal when a user tries to perform a risky action, which asks them to confirm or cancel the action.

## Examples

### Basic warning modal

A basic warning modal is triggered when a user tries to perform an action that is deemed risky. 

You can customize the contents of the modal to fit your use cases. To adjust the text in the modal, pass your desired title to `title` and your message to the `<WarningModal>` component. To customize the action buttons in the modal, use `onConfirm` and `onClose`. 

For further customization, you can utilize all properties of the [modal component](/components/modal), with the exception of `ref`.

```js file="./WarningModalExample.tsx"

```

### Warning modal with a custom button variant

You can apply custom variant to a warning modal's confirmation button.

```js file="./WarningModalDangerExample.tsx"

```


### Warning modal with a checkbox

To confirm that a user wishes to initiate a selected action, you can add a checkbox to a warning modal.

```js file="./WarningModalCheckboxExample.tsx"

```


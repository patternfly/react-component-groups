---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Component groups
# Sidenav secondary level section
# should be the same for all markdown files
id: Ansible
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['Ansible']
---

import Ansible from '@patternfly/react-component-groups/dist/dynamic/Ansible';

The **Ansible** component shows Ansible project logo.

To specify whether Ansible is supported or not, add the `unsupported` property to the `<Ansible>` component.

### Ansible supported

```js file="./AnsibleSupportedExample.tsx"

```

### Ansible unsupported

```js file="./AnsibleUnsupportedExample.tsx"

```

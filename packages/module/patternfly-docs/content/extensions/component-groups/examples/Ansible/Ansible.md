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
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/examples/Ansible/Ansible.md
---

import Ansible from '@patternfly/react-component-groups/dist/dynamic/Ansible';

The **Ansible** component displays the Ansible project logo, with a support status style.

### Ansible supported

By default, the Ansible logo displays as normal and in full color, meaning that it is supported. 

```js file="./AnsibleSupportedExample.tsx"

```

### Ansible unsupported

To specify that Ansible is not supported, add the `unsupported` property to the `<Ansible>` component.

```js file="./AnsibleUnsupportedExample.tsx"

```

import React from 'react';
import { AnsibleSupport } from '@patternfly/react-component-groups/dist/dynamic/AnsibleSupport';

describe('AnsibleSupport', () => {
  it('renders supported AnsibleSupport', () => {
    cy.mount(<AnsibleSupport />)
    cy.get('i').should('have.class', 'ansibleSupported-0-2-2');
  });
  it('renders unsupported Ansible', () => {
    cy.mount(<AnsibleSupport isSupported={false}/>)
    cy.get('i').should('have.class', 'ansibleUnsupported-0-2-3');
  });
});
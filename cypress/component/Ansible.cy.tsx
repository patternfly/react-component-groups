import React from 'react';
import Ansible from '../../packages/module/dist/dynamic/Ansible';

describe('Ansible', () => {
  it('renders supported Ansible', () => {
    /* eslint-disable no-console */
    cy.mount(<Ansible unsupported={false}/>)
    cy.get('i').should('have.class', 'ansibleSupported-0-2-2');
  });
  it('renders unsupported Ansible', () => {
    /* eslint-disable no-console */
    cy.mount(<Ansible unsupported={true}/>)
    cy.get('i').should('have.class', 'ansibleUnsupported-0-2-3');
  });
});
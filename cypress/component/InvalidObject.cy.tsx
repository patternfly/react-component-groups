import React from 'react';
import InvalidObject from '../../packages/module/dist/dynamic/InvalidObject';

describe('InvalidObject', () => {
  it('renders InvalidObject', () => {
    cy.mount(<InvalidObject />)
    cy.get('[class="pf-v5-c-empty-state"]').should('exist')
    cy.get('h1').should('have.text', 'We lost that page');
  });
})
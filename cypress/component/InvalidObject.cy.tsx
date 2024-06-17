import React from 'react';
import InvalidObject from '../../packages/module/dist/dynamic/InvalidObject';

describe('InvalidObject', () => {
  it('renders InvalidObject', () => {
    cy.mount(<InvalidObject />)
    cy.get('[data-ouia-component-id="InvalidObject"]').should('exist')
    cy.get('[data-ouia-component-id="InvalidObject"]').contains('We lost that page');
    cy.get('[data-ouia-component-id="InvalidObject-body"]').contains("Let's find you a new one. Try a new search or return home.");
    cy.get('[data-ouia-component-id="InvalidObject-home-button"]').contains('Return to homepage');
  });
})
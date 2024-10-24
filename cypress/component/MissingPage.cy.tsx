import React from 'react';
import MissingPage from '@patternfly/react-component-groups/dist/dynamic/MissingPage';

describe('MissingPage', () => {
  it('renders MissingPage', () => {
    cy.mount(<MissingPage />)
    cy.get('[data-ouia-component-id="MissingPage"]').should('exist')
    cy.get('[data-ouia-component-id="MissingPage"]').contains('We lost that page');
    cy.get('[data-ouia-component-id="MissingPage-body"]').contains("Let's find you a new one. Try a new search or return home.");
    cy.get('[data-ouia-component-id="MissingPage-home-button"]').contains('Return to homepage');
  });
})
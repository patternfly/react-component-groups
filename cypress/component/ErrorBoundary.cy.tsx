import React from 'react';
import ErrorBoundary from '../../packages/module/dist/dynamic/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders the ErrorBoundary ', () => {
    cy.mount(<ErrorBoundary headerTitle="My app header" errorTitle="Something wrong happened"><div data-ouia-component-id="test">Test</div></ErrorBoundary>)
    cy.get('[data-ouia-component-id="test"]').should('have.text', 'Test');
  });

  it('should expand the details section', () => {
    const Surprise = () => {
      throw new Error('but a welcome one');
    };
    cy.mount(<ErrorBoundary headerTitle="My app header" errorTitle="Something wrong happened">
      <Surprise />
    </ErrorBoundary>)

    cy.get('[class="pf-v5-c-expandable-section__toggle"]').click();
    cy.get('[class="pf-v5-c-expandable-section__content"]').should('contain.text', 'Error: but a welcome one');
  })
})
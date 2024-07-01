import React from 'react';
import ErrorBoundary from '../../packages/module/dist/dynamic/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders the ErrorBoundary ', () => {
    cy.mount(<ErrorBoundary headerTitle="My app header" errorTitle="Something wrong happened"><div data-ouia-component-id="test">Test</div></ErrorBoundary>)
    cy.get('[data-ouia-component-id="test"]').should('have.text', 'Test');
  });
})
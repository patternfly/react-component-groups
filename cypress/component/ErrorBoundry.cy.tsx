import React from 'react';
import ErrorBoundary from '../../packages/module/dist/dynamic/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders the ErrorBoundary ', () => {
    cy.mount(<ErrorBoundary headerTitle="My app header" errorTitle="Something wrong happened"/>)
    // cy.get('div').debug();
  });
})
import React from 'react';
import { Button } from '@patternfly/react-core';
import ErrorBoundary from '../../packages/module/dist/dynamic/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders the ErrorBoundary ', () => {
    cy.mount(<ErrorBoundary headerTitle="My app header" errorTitle="Something wrong happened">
      <Button ouiaId="test-content">Test</Button>
    </ErrorBoundary>);
    cy.get('[data-ouia-component-id="test-content"]').contains('Test');
    cy.get('[data-ouia-component-id="ErrorState"]').should('not.exist');
  });
})
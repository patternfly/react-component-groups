import React from 'react';
import { Button } from '@patternfly/react-core';
import NotAuthorized from '../../packages/module/dist/dynamic/NotAuthorized';

describe('NotAuthorized', () => {
  it('renders basic NotAuthorized', () => {
    cy.mount(<NotAuthorized 
      bodyText="Test text" 
      serviceName="Test bundle"
    />);
    cy.get('[data-ouia-component-id="NotAuthorized"]').contains('You do not have access to Test bundle');
    cy.get('[data-ouia-component-id="NotAuthorized-body"]').contains('Test text');
  });

  it('renders NotAuthorized with custom action buttons', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    const primaryAction = 
    <Button key="1" onClick={onClickSpy} ouiaId="test-button">
      Custom primary action
    </Button>;
    const customNotAuthorized = <NotAuthorized 
      primaryAction={primaryAction}
      bodyText="Test text" 
      serviceName="Demo bundle"
      prevPageButtonText="Go to previous page"
    />
    cy.mount(customNotAuthorized);
    const customButton = cy.get('[data-ouia-component-id="test-button"]')
    customButton.should('exist');
    customButton.should('have.text', 'Custom primary action');
    customButton.click();
    cy.get('@onClickSpy').should('have.been.called');
  });
});
import React from 'react';
import { Button } from '@patternfly/react-core';
import NotAuthorized from '../../packages/module/dist/dynamic/NotAuthorized';

describe('NotAuthorized', () => {
  it('renders basic NotAuthorized', () => {
    cy.mount(<NotAuthorized 
      bodyText="Test text" 
      serviceName="Test bundle"
      prevPageButtonText="Go to previous page"
    />);
    cy.get('div div div h5').should('have.text', 'You do not have access to Test bundle');
    cy.get('[class="pf-v5-c-empty-state__body"').should('have.text', 'Test text');
  });

  it('renders NotAuthorized with custom action buttons', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    const primaryAction = 
    <Button key="1" onClick={onClickSpy}>
      Custom primary action
    </Button>;
    const customNotAuthorized = <NotAuthorized 
      primaryAction={primaryAction}
      bodyText="Test text" 
      serviceName="Demo bundle"
      prevPageButtonText="Go to previous page"
    />
    cy.mount(customNotAuthorized);
    const customButton = cy.get('div div div div button')
    customButton.should('exist');
    customButton.should('have.text', 'Custom primary action');
    customButton.click();
    cy.get('@onClickSpy').should('have.been.called');
  });
});
import React from 'react';
import ErrorState from '../../packages/module/dist/dynamic/ErrorState';
import { ActionButton } from '../../packages/module/dist/dynamic/ActionButton'

describe('ErrorState', () => {
  it('renders the Close button', () => {
    cy.mount(<ErrorState titleText='Sample error title' bodyText='Sample error description' />);
    cy.get('[data-ouia-component-id="ErrorState"]').contains('Sample error title');
    cy.get('[data-ouia-component-id="ErrorState-body"]').should('have.text', 'Sample error description');
  });

  it('render with a custom footer', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<ErrorState titleText='Sample error title' bodyText='Sample error description' customFooter={<ActionButton variant="secondary" onClick={onClickSpy}>
    Custom action
    </ActionButton>}/>);
    cy.get('button').should('have.text', "Custom action");
    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.called');
  })
})
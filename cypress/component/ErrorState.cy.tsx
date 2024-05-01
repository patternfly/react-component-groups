import React from 'react';
import ErrorState from '../../packages/module/dist/dynamic/ErrorState';
import { ActionButton } from '../../packages/module/dist/dynamic/ActionButton'

describe('ErrorState', () => {
  /* eslint-disable no-console */
  it('renders the Close button', () => {
    cy.mount(<ErrorState errorTitle='Sample error title' errorDescription='Sample error description' />);
    cy.get('h4').should('have.text', 'Sample error title');
  });

  it('render with a custom footer', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<ErrorState errorTitle='Sample error title' errorDescription='Sample error description' customFooter={<ActionButton variant="secondary" onClick={onClickSpy}>
    Custom action
    </ActionButton>}/>);
    cy.get('button').should('exist');
    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.called');
  })
})
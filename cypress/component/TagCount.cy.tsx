import React from 'react';
import TagCount from '../../packages/module/dist/dynamic/TagCount';

describe('TagCount', () => {
  it('renders TagCount', () => {
    cy.mount(<TagCount count={50} />)
    cy.get('button').should('exist');
    cy.get('button span').should('have.text', '50');
  });

  it('render disabled', () => {
    cy.mount(<TagCount disabled={true} />)
    cy.get('button').should('be.disabled');
  });
});
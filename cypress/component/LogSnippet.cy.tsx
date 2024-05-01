import React from 'react';
import LogSnippet from '../../packages/module/dist/dynamic/LogSnippet';

describe('LogSnippet', () => {
  it('renders LogSnippet', () => {
    cy.mount(<LogSnippet logSnippet='test test code' message='A test message'/>)
    cy.get('div div p').should('have.text', 'A test message');
  });
});
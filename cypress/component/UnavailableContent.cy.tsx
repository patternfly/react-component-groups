import React from 'react';
import UnavailableContent from '../../packages/module/dist/dynamic/UnavailableContent';

describe('UnavailableContent', () => {
  it('renders UnavailableContent', () => {
    cy.mount(<UnavailableContent />)
    cy.get('[class="pf-v5-c-empty-state__content"').should('exist');
    cy.get('div div div h5').should('have.text', 'This page is temporarily unavailable');
  });
});
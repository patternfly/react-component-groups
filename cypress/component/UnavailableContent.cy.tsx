import React from 'react';
import UnavailableContent from '../../packages/module/dist/dynamic/UnavailableContent';

describe('UnavailableContent', () => {
  it('renders UnavailableContent', () => {
    cy.mount(<UnavailableContent />)
    cy.get('[data-ouia-component-id="UnavailableContent"]').should('exist');
    cy.get('[data-ouia-component-id="UnavailableContent"]').contains('This page is temporarily unavailable');
    cy.get('[data-ouia-component-id="UnavailableContent-body"]').contains('Try refreshing the page. If the problem persists, contact your organization administrator or visit our status page for known outages.');
  });
});
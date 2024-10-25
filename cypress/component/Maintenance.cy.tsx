import React from 'react';
import Maintenance from '../../packages/module/dist/dynamic/Maintenance';

describe('Maintenance', () => {
  it('renders Maintenance', () => {
    cy.mount(<Maintenance />)
    cy.get('[data-ouia-component-id="Maintenance"]').should('exist');
    cy.get('[data-ouia-component-id="Maintenance"]').contains('Maintenance in progress');
    cy.get('[data-ouia-component-id="Maintenance-body"]').contains('We are currently undergoing scheduled maintenance and will be unavailable from 10am to 12am UTC (6am-8am EST). For more information please visit status.redhat.com.');
  });
});
import React, { useState } from 'react';
import BulkSelect, { BulkSelectProps, BulkSelectValue } from '../../packages/module/dist/dynamic/BulkSelect';

interface DataItem {
  name: string
};

const BulkSelectTestComponent = ({ canSelectAll }: Omit<BulkSelectProps, 'onSelect' | 'selectedCount' >) => {
  const [ selected, setSelected ] = useState<DataItem[]>([]);

  const allData = [ { name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' } ];
  const pageData = [ { name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' } ];
  const pageDataNames = pageData.map((item) => item.name);

  const handleBulkSelect = (value: BulkSelectValue) => {
    value === BulkSelectValue.none && setSelected([]);
    value === BulkSelectValue.page && setSelected(pageData);
    value === BulkSelectValue.all && setSelected(allData);
    value === BulkSelectValue.nonePage && setSelected(selected.filter(item => !pageDataNames.includes(item.name)))};

  return (
    <BulkSelect
      canSelectAll={canSelectAll}
      pageCount={pageData.length}
      totalCount={allData.length}
      selectedCount={selected.length}
      pageSelected={selected.length > 0 && selected.length <= 5}
      pagePartiallySelected={selected.length > 0 && selected.length < 5}
      onSelect={handleBulkSelect}
    />
  );
};

describe('BulkSelect', () => {
  it('renders the bulk select', () => {
    cy.mount(
      <BulkSelectTestComponent />
    );
    cy.get('[data-ouia-component-id="BulkSelect-checkbox"]').should('exist');
    cy.get('[data-ouia-component-id="BulkSelect-toggle"]').click();
    cy.get('[data-ouia-component-id="BulkSelect-select-all"]').should('not.exist');
    cy.get('[data-ouia-component-id="BulkSelect-select-page"]').should('exist');
    cy.get('[data-ouia-component-id="BulkSelect-select-none"]').should('exist');
  
    cy.contains('0 selected').should('not.exist');
  });

  it('renders the bulk select without all', () => {
    cy.mount(
      <BulkSelectTestComponent canSelectAll />
    );
    cy.get('[data-ouia-component-id="BulkSelect-checkbox"]').should('exist');
    cy.get('[data-ouia-component-id="BulkSelect-toggle"]').click();
    cy.get('[data-ouia-component-id="BulkSelect-select-all"]').should('exist');
    cy.get('[data-ouia-component-id="BulkSelect-select-page"]').should('exist');
    cy.get('[data-ouia-component-id="BulkSelect-select-none"]').should('exist');
  
    cy.contains('0 selected').should('not.exist');
  });
  
  it('renders the bulk select with data', () => {
    cy.mount(
      <BulkSelectTestComponent canSelectAll />
    );
  
    // Initial state
    cy.get('input[type="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).should('not.be.checked');
    });
  
    // Checkbox select
    cy.get('[data-ouia-component-id="BulkSelect-checkbox"]').first().click();
    cy.get('input[type="checkbox"]').should('be.checked');
    cy.contains('5 selected').should('exist');
  
    // Select none
    cy.get('[data-ouia-component-id="BulkSelect-toggle"]').first().click({ force: true });
    cy.get('[data-ouia-component-id="BulkSelect-select-none"]').first().click();
    cy.contains('0 selected').should('not.exist');
  
    // Select all
    cy.get('[data-ouia-component-id="BulkSelect-toggle"]').first().click({ force: true });
    cy.get('[data-ouia-component-id="BulkSelect-select-all"]').first().click();
    cy.contains('6 selected').should('exist');
  
    // Checkbox deselect
    cy.get('[data-ouia-component-id="BulkSelect-checkbox"]').first().click({ force: true });
    cy.contains('1 selected').should('exist');
  
    // Select page
    cy.get('[data-ouia-component-id="BulkSelect-toggle"]').first().click({ force: true });
    cy.get('[data-ouia-component-id="BulkSelect-select-page"]').first().click();
    cy.contains('5 selected').should('exist');
  });
});
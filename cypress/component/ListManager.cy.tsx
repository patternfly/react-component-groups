import { useState } from 'react';
import ListManager, { Column, ListManagerProps } from '../../packages/module/dist/dynamic/ListManager';

const ALL_COLUMNS: Column[] = [
  { key: 'first', title: 'First', isShownByDefault: true },
  { key: 'second', title: 'Second', isShownByDefault: true },
  { key: 'third', title: 'Third', isShownByDefault: false },
  { key: 'fourth', title: 'Fourth', isShownByDefault: true, isUntoggleable: true },
];

const ListManagerTest = (props: Partial<ListManagerProps>) => {
  const [columns, setColumns] = useState(props.columns || ALL_COLUMNS);
  return <ListManager {...props} columns={columns} onSave={setColumns} onCancel={() => setColumns(props.columns || ALL_COLUMNS)} />;
};

describe('ListManager', () => {
  it('renders', () => {
    cy.mount(<ListManagerTest />);
    cy.get('[data-ouia-component-id="Column-save-button"]').should('exist');
    cy.get('[data-ouia-component-id="Column-cancel-button"]').should('exist');
    cy.get('[data-ouia-component-id="BulkSelect-checkbox"]').should('exist');
    cy.get('[data-ouia-component-id="Column-column-list"]').should('exist');
  });

  it('toggles checkboxes', () => {
    cy.mount(<ListManagerTest />);
    cy.get('[data-testid="column-check-first"]').find('input').should('be.checked');
    cy.get('[data-testid="column-check-second"]').find('input').should('be.checked');
    cy.get('[data-testid="column-check-third"]').find('input').should('not.be.checked');
    cy.get('[data-testid="column-check-fourth"]').find('input').should('be.checked');
    cy.get('[data-testid="column-check-fourth"]').find('input').should('be.disabled');

    cy.get('[data-testid="column-check-first"]').click();
    cy.get('[data-testid="column-check-first"]').find('input').should('not.be.checked');

    cy.get('[data-testid="column-check-third"]').click();
    cy.get('[data-testid="column-check-third"]').find('input').should('be.checked');
  });

  it('selects all and none', () => {
    cy.mount(<ListManagerTest />);
    cy.get('[data-ouia-component-id="BulkSelect-toggle"]').click();
    cy.get('[data-ouia-component-id="BulkSelect-select-none"]').click();
    cy.get('[data-testid="column-check-first"]').find('input').should('not.be.checked');
    cy.get('[data-testid="column-check-second"]').find('input').should('not.be.checked');
    cy.get('[data-testid="column-check-third"]').find('input').should('not.be.checked');
    // fourth is untoggleable
    cy.get('[data-testid="column-check-fourth"]').find('input').should('be.checked');

    cy.get('[data-ouia-component-id="BulkSelect-toggle"]').click();
    cy.get('[data-ouia-component-id="BulkSelect-select-all"]').click();
    cy.get('[data-testid="column-check-first"]').find('input').should('be.checked');
    cy.get('[data-testid="column-check-second"]').find('input').should('be.checked');
    cy.get('[data-testid="column-check-third"]').find('input').should('be.checked');
    cy.get('[data-testid="column-check-fourth"]').find('input').should('be.checked');
  });

  it('saves and cancels', () => {
    cy.mount(<ListManagerTest />);
    cy.get('[data-testid="column-check-first"]').click();
    cy.get('[data-testid="column-check-first"]').find('input').should('not.be.checked');
    cy.get('[data-ouia-component-id="Column-save-button"]').click();
    cy.get('[data-testid="column-check-first"]').find('input').should('not.be.checked');

    cy.get('[data-testid="column-check-first"]').click();
    cy.get('[data-testid="column-check-first"]').find('input').should('be.checked');
    cy.get('[data-ouia-component-id="Column-cancel-button"]').click();
    cy.get('[data-testid="column-check-first"]').find('input').should('not.be.checked');
  });
});

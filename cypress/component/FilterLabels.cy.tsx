import React from 'react';
import { FilterLabels, FilterLabelsProps } from '../../packages/module/dist/dynamic/FilterLabels';

describe('FilterLabels', () => {
  const filters: FilterLabelsProps['filters'] = [
    { text: 'Label 1', count: 5 },
    { text: 'Label 2', count: 2 },
    {
      categoryName: 'Group 1',
      labels: [ { text: 'Label 3' }, { text: 'Label 4', count: 3 } ],
    },
  ];

  const renderComponent = (props?: Partial<FilterLabelsProps>) => {
    cy.mount(<FilterLabels filters={filters} onDelete={cy.stub()} {...props} />);
  };

  it('renders basic FilterLabels with correct structure', () => {
    renderComponent();

    cy.get('[data-ouia-component-id="FilterLabels-group-Label 1"]').should('exist');
    cy.get('[data-ouia-component-id="FilterLabels-group-Label 2"]').should('exist');
    cy.get('[data-ouia-component-id="FilterLabels-group-Group 1"]').should('exist');

    cy.get('[data-ouia-component-id="FilterLabels-label-Label 1"]').should('exist');
    cy.get('[data-ouia-component-id="FilterLabels-label-Label 2"]').should('exist');
    cy.get('[data-ouia-component-id="FilterLabels-label-Group 1-Label 3"]').should('exist');
    cy.get('[data-ouia-component-id="FilterLabels-label-Group 1-Label 4"]').should('exist');
  });

  it('renders count badges correctly', () => {
    renderComponent();

    cy.get('[data-ouia-component-id="FilterLabels-label-Label 1-badge"]').should('contain', '5');
    cy.get('[data-ouia-component-id="FilterLabels-label-Label 2-badge"]').should('contain', '2');
    cy.get('[data-ouia-component-id="FilterLabels-label-Group 1-Label 4-badge"]').should('contain', '3');
  });

  it('calls onDelete when individual labels are clicked', () => {
    const onDelete = cy.stub().as('onDelete');
    renderComponent({ onDelete });

    cy.get('button[data-ouia-component-id="FilterLabels-label-Label 1"]').click();
    cy.get('@onDelete').should('have.been.calledWithMatch', Cypress.sinon.match.any, [ { text: 'Label 1', count: 5 } ]);

    cy.get('button[data-ouia-component-id="FilterLabels-label-Label 2"]').click();
    cy.get('@onDelete').should('have.been.calledWithMatch', Cypress.sinon.match.any, [ { text: 'Label 2', count: 2 } ]);
  });

  it('renders custom delete all button label when provided', () => {
    const customDeleteAllButtonTitle = 'Remove all filters';
    const onDelete = cy.stub().as('onDelete');
    renderComponent({ showDeleteAllButton: true, onDelete, deleteAllButtonTitle: customDeleteAllButtonTitle });

    cy.get('[data-ouia-component-id="FilterLabels-delete-all-button"]').should('exist');
    cy.get('[data-ouia-component-id="FilterLabels-delete-all-button"]').contains(customDeleteAllButtonTitle).click();
    cy.get('@onDelete').should('have.been.calledWithMatch', Cypress.sinon.match.any, filters);
  });


  it('renders delete all button when showDeleteAllButton is true', () => {
    const onDelete = cy.stub().as('onDelete');
    renderComponent({ showDeleteAllButton: true, onDelete });

    cy.get('[data-ouia-component-id="FilterLabels-delete-all-button"]').should('exist');
    cy.get('[data-ouia-component-id="FilterLabels-delete-all-button"]').contains('Clear filters').click();
    cy.get('@onDelete').should('have.been.calledWithMatch', Cypress.sinon.match.any, filters);
  });

  it('does not render delete all button when filters array is empty', () => {
    renderComponent({ showDeleteAllButton: true, filters: [] });

    cy.get('[data-ouia-component-id="FilterLabels-delete-all-button"]').should('not.exist');
  });

  it('does not render the delete all button when showDeleteAllButton is false', () => {
    renderComponent({ showDeleteAllButton: false });

    cy.get('[data-ouia-component-id="FilterLabels-delete-all-button"]').should('not.exist');
  });
});

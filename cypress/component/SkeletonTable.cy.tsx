import React from 'react';
import { RowSelectVariant, Th } from '@patternfly/react-table';
import SkeletonTable from '../../packages/module/dist/dynamic/SkeletonTable';

describe('SkeletonTable', () => {
  beforeEach(() => {
    cy.viewport(1600, 800);
  });

  it('renders SkeletonTable', () => {
    const SkeletonTableExample = <SkeletonTable rows={10} columns={[ 'first', 'second' ]} />;
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr').should('have.text', 'firstsecond');
  });

  it ('can be used without passing columns', () => {
    const SkeletonTableExample = <SkeletonTable rows={10} numberOfColumns={2} />;
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr').should('have.text', '');
  });

  it('contains checkboxes when passed isSelectable', () => {
    const SkeletonTableExample = <SkeletonTable rows={10} columns={[ 'first', 'second' ]} isSelectable />;
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr').should('have.text', 'firstsecond');
    cy.get('input[type="checkbox"]').should('have.length', 10);
  });

  it('is expandable when passed isExpandable', () => {
    const SkeletonTableExample = <SkeletonTable rows={10} columns={[ 'first', 'second' ]} isExpandable />;
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr').should('have.text', 'firstsecond');
    cy.get('.pf-v6-c-table__toggle-icon').should('have.length', 10);
  });

  it('can be passed a selectVariant to render radio buttons', () => {
    const SkeletonTableExample = <SkeletonTable rows={10} columns={[ 'first', 'second' ]} isSelectable selectVariant={RowSelectVariant.radio} />;
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr').should('have.text', 'firstsecond');
    cy.get('input[type="radio"]').should('have.length', 10);
  });

  it('can be passed custom columns', () => {
    const SkeletonTableExample = (
      <SkeletonTable
        rows={10}
        columns={[
          <Th key="1" sort={{ columnIndex: 0, sortBy: { index: 0, direction: 'asc' } }}>
            first
          </Th>,
          <Th key="2">second</Th>,
          <Th key="3">third</Th>
        ]}
      />
    );
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr').should('have.text', 'firstsecondthird');
    cy.get('.pf-v6-c-table__sort-indicator').eq(0).find('path').should(
      'have.attr',
      'd',
      'M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z' // ascending
    );
  })
});
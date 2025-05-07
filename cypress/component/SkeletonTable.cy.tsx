import { RowSelectVariant } from '@patternfly/react-table';
import SkeletonTable from '@patternfly/react-component-groups/dist/dynamic/SkeletonTable';

describe('SkeletonTable', () => {
  beforeEach(() => {
    cy.viewport(1600, 800);
  });

  it('renders SkeletonTable', () => {
    const SkeletonTableExample = <SkeletonTable rowsCount={10} columns={[ 'First', 'Second' ]} />;
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr th').eq(0).should('have.text', 'First');
    cy.get('table thead tr th').eq(1).should('have.text', 'Second');
  });

  it('can be used without passing columns', () => {
    const SkeletonTableExample = <SkeletonTable rowsCount={10} columnsCount={2} />;
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr').should('have.text', '');
  });

  it('contains checkboxes when passed isSelectable', () => {
    const SkeletonTableExample = <SkeletonTable rowsCount={10} columns={[ 'First', 'Second' ]} isSelectable />;
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr th').eq(0).should('have.text', 'Data selection table header cell');
    cy.get('table thead tr th').eq(1).should('have.text', 'First');
    cy.get('table thead tr th').eq(2).should('have.text', 'Second');
    cy.get('input[type="checkbox"]').should('have.length', 10);
  });

  it('is expandable when passed isExpandable', () => {
    const SkeletonTableExample = <SkeletonTable rowsCount={10} columns={[ 'First', 'Second' ]} isExpandable />;
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr th').eq(0).should('have.text', 'Data expansion table header cell');
    cy.get('table thead tr th').eq(1).should('have.text', 'First');
    cy.get('table thead tr th').eq(2).should('have.text', 'Second');
    cy.get('.pf-v6-c-table__toggle-icon').should('have.length', 10);
  });

  it('can be passed a selectVariant to render radio buttons', () => {
    const SkeletonTableExample = (
      <SkeletonTable rowsCount={10} columns={[ 'First', 'Second' ]} isSelectable selectVariant={RowSelectVariant.radio} />
    );
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr th').eq(0).should('have.text', 'Data selection table header cell');
    cy.get('table thead tr th').eq(1).should('have.text', 'First');
    cy.get('table thead tr th').eq(2).should('have.text', 'Second');
    cy.get('input[type="radio"]').should('have.length', 10);
  });

  it('can be passed custom columns props', () => {
    const SkeletonTableExample = (
      <SkeletonTable
        rows={10}
        columns={[
          { cell: 'first', props: { sort: { columnIndex: 0, sortBy: { index: 0, direction: 'asc' } } } },
          { cell: 'second' },
          { cell: 'third' }
        ]}
      />
    );
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr th').eq(0).should('have.text', 'first');
    cy.get('table thead tr th').eq(1).should('have.text', 'second');
    cy.get('table thead tr th').eq(2).should('have.text', 'third');
    cy.get('.pf-v6-c-table__sort-indicator').eq(0).find('path').should(
      'have.attr',
      'd',
      'M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z' // ascending
    );
  });
});

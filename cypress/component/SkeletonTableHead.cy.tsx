import { Table } from '@patternfly/react-table';
import { SkeletonTableHead } from '@patternfly/react-component-groups/dist/dynamic/SkeletonTableHead';

describe('SkeletonTableHead', () => {
  beforeEach(() => {
    cy.viewport(1600, 800);
  });

  it('renders SkeletonTable with custom columns', () => {
    const SkeletonTableExample = (
      <Table>
        <SkeletonTableHead columns={[ 'First', 'Second' ]} />
      </Table>
    );
    cy.mount(SkeletonTableExample);
    cy.get('table thead tr th').eq(0).should('have.text', 'First');
    cy.get('table thead tr th').eq(1).should('have.text', 'Second');
  });

  it('renders SkeletonTable with column count but no custom columns', () => {
    const SkeletonTableExample = (
      <Table>
        <SkeletonTableHead columnsCount={2} />
      </Table>
    );
    cy.mount(SkeletonTableExample);
    cy.get('table thead tr th').should('have.length', 2);
    cy.get('table thead tr th').each((th) => {
      cy.wrap(th).find('.pf-v5-c-skeleton').should('exist');
    });
  });

  it('renders SkeletonTable with selectable column', () => {
    const SkeletonTableExample = (
      <Table>
        <SkeletonTableHead columns={[ 'First' ]} isSelectable />
      </Table>
    );
    cy.mount(SkeletonTableExample);
    cy.get('table thead tr th').should('have.length', 2);
    cy.get('table thead tr th').eq(0).should('have.text', 'Data selection table header cell');
  });

  it('renders SkeletonTable with expandable column', () => {
    const SkeletonTableExample = (
      <Table>
        <SkeletonTableHead columns={[ 'First' ]} isExpandable />
      </Table>
    );
    cy.mount(SkeletonTableExample);
    cy.get('table thead tr th').should('have.length', 2);
    cy.get('table thead tr th').eq(0).should('have.text', 'Data expansion table header cell');
  });

  it('renders SkeletonTable with selectable and expandable columns', () => {
    const SkeletonTableExample = (
      <Table>
        <SkeletonTableHead columns={[ 'First', 'Second' ]} isSelectable isExpandable />
      </Table>
    );
    cy.mount(SkeletonTableExample);
    cy.get('table thead tr th').should('have.length', 4);
  });

  it('renders SkeletonTable with custom ouiaId', () => {
    const customOuiaId = 'CustomOuia';
    const SkeletonTableExample = (
      <Table>
        <SkeletonTableHead columns={[ 'First', 'Second' ]} ouiaId={customOuiaId} />
      </Table>
    );
    cy.mount(SkeletonTableExample);
    cy.get('thead').should('have.attr', 'data-ouia-component-id', `${customOuiaId}-thead`);
    cy.get('th').each((th, index) => {
      cy.wrap(th).should('have.attr', 'data-ouia-component-id', `${customOuiaId}-th-${index}`);
    });
  });

  it('handles no columns and no columnsCount', () => {
    const SkeletonTableExample = (
      <Table>
        <SkeletonTableHead />
      </Table>
    );
    cy.mount(SkeletonTableExample);
    cy.get('table thead tr th').should('have.length', 1);
  });
});

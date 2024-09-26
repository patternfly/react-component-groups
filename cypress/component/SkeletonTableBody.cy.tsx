import React from 'react';
import { RowSelectVariant } from '@patternfly/react-table';
import SkeletonTableBody from '@patternfly/react-component-groups/dist/dynamic/SkeletonTableBody';

describe('SkeletonTableBody', () => {
  beforeEach(() => {
    cy.viewport(1600, 800);
  });

  it('renders SkeletonTableBody', () => {
    const SkeletonTableExample = <SkeletonTableBody rowsCount={10} columnsCount={2} />;
    cy.mount(SkeletonTableExample);
    cy.get('div[class="pf-v5-c-skeleton"]').should('have.length', 20);
  });

  it('contains checkboxes when passed isSelectable', () => {
    cy.mount(<SkeletonTableBody rowsCount={10} columnsCount={2} isSelectable />);
    cy.get('input[type="checkbox"]').should('have.length', 10);
  });

  it('is expandable when passed isExpandable', () => {
    cy.mount(<SkeletonTableBody rowsCount={10} columnsCount={2} isExpandable />);
    cy.get('.pf-v5-c-table__toggle-icon').should('have.length', 10);
  });

  it('can be passed a selectVariant to render radio buttons', () => {
    cy.mount(<SkeletonTableBody rowsCount={10} columnsCount={2} isSelectable selectVariant={RowSelectVariant.radio} />);
    cy.get('input[type="radio"]').should('have.length', 10);
  });
});
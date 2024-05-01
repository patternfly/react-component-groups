import React from 'react';
import SkeletonTable from '../../packages/module/dist/dynamic/SkeletonTable';

describe('SkeletonTable', () => {
  /* eslint-disable no-console */
  it('renders SkeletonTable', () => {
    const SkeletonTableExample =  <SkeletonTable rowSize={10} columns={[ 'first', 'second' ]} />;
    cy.mount(SkeletonTableExample);
    cy.get('table').should('exist');
    cy.get('table thead tr').should('have.text', 'firstsecond');
  });
})
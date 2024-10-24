import React from 'react';
import { render } from '@testing-library/react';
import SkeletonTableHead from './SkeletonTableHead';
import { Table } from '@patternfly/react-table';

describe('SkeletonTableHead component', () => {
  it('should render correctly with count', () => {
    expect(render(<Table><SkeletonTableHead columnsCount={2} isSelectable isExpandable /></Table>)).toMatchSnapshot();
  });

  it('should render correctly with count', () => {
    expect(render(<Table><SkeletonTableHead columns={[ 'First', 'Second' ]} isTreeTable isSelectable /></Table>)).toMatchSnapshot();
  });
});

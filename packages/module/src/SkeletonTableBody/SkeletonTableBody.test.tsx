import React from 'react';
import { render } from '@testing-library/react';
import SkeletonTableBody from './SkeletonTableBody';
import { Table } from '@patternfly/react-table';

describe('SkeletonTableBody component', () => {
  it('should render correctly', () => {
    expect(render(<Table><SkeletonTableBody columnsCount={2} /></Table>)).toMatchSnapshot();
  });
});

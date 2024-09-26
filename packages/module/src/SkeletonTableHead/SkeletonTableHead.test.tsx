import React from 'react';
import { render } from '@testing-library/react';
import SkeletonTableHead from './SkeletonTableHead';

describe('SkeletonTableHead component', () => {
  it('should render correctly with count', () => {
    expect(render(<SkeletonTableHead columnsCount={2} isSelectable isExpandable />)).toMatchSnapshot();
  });

  it('should render correctly with count', () => {
    expect(render(<SkeletonTableHead columns={[ 'First', 'Second' ]} isTreeTable isSelectable />)).toMatchSnapshot();
  });
});

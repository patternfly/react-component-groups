import React from 'react';
import { render } from '@testing-library/react';
import SkeletonTableBody from './SkeletonTableBody';

describe('SkeletonTableBody component', () => {
  it('should render correctly', () => {
    expect(render(<SkeletonTableBody columnsCount={2} />)).toMatchSnapshot();
  });
});

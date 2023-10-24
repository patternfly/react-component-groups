import React from 'react';
import { render } from '@testing-library/react';
import SkeletonTable from './SkeletonTable';

describe('SkeletonTable component', () => {
  it('should render correctly', () => {
    expect(render(<SkeletonTable columns={[ 'first', 'second' ]}/>)).toMatchSnapshot();
  });

  it('should render correctly with rows', () => {
    expect(render(<SkeletonTable columns={[ 'first', 'second' ]} rows={5} />)).toMatchSnapshot();
  });
});

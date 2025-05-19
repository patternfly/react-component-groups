import { render } from '@testing-library/react';
import SkeletonTable from './SkeletonTable';

describe('SkeletonTable component', () => {
  it('should render correctly', () => {
    expect(render(<SkeletonTable columns={[ 'First', 'Second' ]}/>)).toMatchSnapshot();
  });

  it('should render correctly with rows', () => {
    expect(render(<SkeletonTable columns={[ 'First', 'Second' ]} rows={10} />)).toMatchSnapshot();
  });
});

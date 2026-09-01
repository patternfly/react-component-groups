import { render } from '@testing-library/react';
import SkeletonTable from './SkeletonTable';

describe('SkeletonTable component', () => {
  it('should render correctly', () => {
    expect(render(<SkeletonTable columns={[ 'First', 'Second' ]}/>)).toMatchSnapshot();
  });

  it('should render correctly with rows', () => {
    expect(render(<SkeletonTable columns={[ 'First', 'Second' ]} rows={10} />)).toMatchSnapshot();
  });

  it('should render without header when hasHeader is false', () => {
    const { container } = render(<SkeletonTable columnsCount={2} hasHeader={false} />);
    expect(container.querySelectorAll('thead')).toHaveLength(0);
    expect(container.querySelectorAll('tbody')).toHaveLength(1);
  });

  it('should render with header by default', () => {
    const { container } = render(<SkeletonTable columnsCount={2} />);
    expect(container.querySelectorAll('thead')).toHaveLength(1);
    expect(container.querySelectorAll('tbody')).toHaveLength(1);
  });
});

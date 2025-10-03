import { render } from '@testing-library/react';
import SkeletonTableHead from './SkeletonTableHead';
import { Table, Th } from '@patternfly/react-table';

describe('SkeletonTableHead component', () => {
  it('should render correctly with count', () => {
    expect(render(<Table><SkeletonTableHead columnsCount={2} isSelectable isExpandable /></Table>)).toMatchSnapshot();
  });

  it('should render correctly with string columns', () => {
    expect(render(<Table><SkeletonTableHead columns={[ 'First', 'Second' ]} isTreeTable isSelectable /></Table>)).toMatchSnapshot();
  });

  it('should render correctly with Th element columns without nesting', () => {
    const { container } = render(
      <Table>
        <SkeletonTableHead
          columns={[
            <Th key="1" sort={{ columnIndex: 0, sortBy: {} }}>First</Th>,
            <Th key="2" sort={{ columnIndex: 1, sortBy: {} }}>Second</Th>
          ]}
        />
      </Table>
    );

    // Ensure there are no nested <th> elements
    const theadCells = container.querySelectorAll('thead th');
    theadCells.forEach(th => {
      const nestedTh = th.querySelector('th');
      expect(nestedTh).toBeNull();
    });

    expect(container).toMatchSnapshot();
  });
});

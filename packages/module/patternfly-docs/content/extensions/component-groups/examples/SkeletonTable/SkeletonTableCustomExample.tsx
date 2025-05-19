import { FC } from 'react';
import SkeletonTable from '@patternfly/react-component-groups/dist/dynamic/SkeletonTable';
import { Th } from '@patternfly/react-table';

export const SkeletonTableExample: FC = () => (
  <SkeletonTable
    rowsCount={10}
    columns={[
      <Th key="1" sort={{ columnIndex: 0, sortBy: {} }}>
        First
      </Th>,
      <Th key="2" sort={{ columnIndex: 1, sortBy: {} }}>
        Second
      </Th>
    ]}
  />
);

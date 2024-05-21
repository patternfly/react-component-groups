import React from 'react';
import SkeletonTable from '@patternfly/react-core/dist/js/components/Skeleton/SkeletonTable';
import { Th } from '@patternfly/react-table';

export const SkeletonTableExample: React.FC = () => (
  <SkeletonTable
    rowSize={10}
    columns={[
      <Th key="1" sort={{ columnIndex: 0, sortBy: {} }}>
        first
      </Th>,
      <Th key="2" sort={{ columnIndex: 1, sortBy: {} }}>
        second
      </Th>
    ]}
  />
);

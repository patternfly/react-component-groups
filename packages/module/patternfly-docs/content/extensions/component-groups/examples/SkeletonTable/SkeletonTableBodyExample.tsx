import { FC } from 'react';
import { Table } from '@patternfly/react-table';
import SkeletonTableBody from '@patternfly/react-component-groups/dist/dynamic/SkeletonTableBody';

export const SkeletonTableBodyExample: FC = () => (
  <Table>
    <SkeletonTableBody isSelectable rowsCount={5} columnsCount={2} />
  </Table>
);

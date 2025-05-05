import { FC } from 'react';
import { Table } from '@patternfly/react-table';
import SkeletonTableHead from '@patternfly/react-component-groups/dist/dynamic/SkeletonTableHead';

export const SkeletonTableHeadExample: FC = () => (
  <Table>
    <SkeletonTableHead columns={[ 'First', 'Second' ]} />
  </Table>
);

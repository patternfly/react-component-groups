import React from 'react';
import { Table } from '@patternfly/react-table';
import SkeletonTableHead from "@patternfly/react-component-groups/dist/dynamic/SkeletonTableHead";

export const SkeletonTableHeadExample: React.FC = () => (
  <Table>
    <SkeletonTableHead columns={[ 'First', 'Second' ]} />
  </Table>
);
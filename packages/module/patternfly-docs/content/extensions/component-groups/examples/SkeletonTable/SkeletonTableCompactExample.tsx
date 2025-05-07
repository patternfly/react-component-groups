import { FC } from 'react';
import SkeletonTable from '@patternfly/react-component-groups/dist/dynamic/SkeletonTable';
import { TableVariant } from '@patternfly/react-table';

export const SkeletonTableExample: FC = () => (
  <SkeletonTable rowsCount={10} columns={[ 'First', 'Second' ]} variant={TableVariant.compact} borders={false} />
);

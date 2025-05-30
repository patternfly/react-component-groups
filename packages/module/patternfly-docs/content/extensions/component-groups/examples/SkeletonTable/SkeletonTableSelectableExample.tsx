import { FC } from 'react';
import SkeletonTable from '@patternfly/react-component-groups/dist/dynamic/SkeletonTable';
import { RowSelectVariant } from '@patternfly/react-table';

export const SkeletonTableExample: FC = () => (
  <SkeletonTable rowsCount={10} columns={[ 'First', 'Second' ]} isSelectable selectVariant={RowSelectVariant.radio} />
);

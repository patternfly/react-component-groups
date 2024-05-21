import React from 'react';
import SkeletonTable from '@patternfly/react-core/dist/js/components/Skeleton/SkeletonTable';

export const SkeletonTableExample: React.FC = () => (
  <SkeletonTable rowSize={10} columns={[ 'first', 'second' ]} isSelectable selectVariant="radio" />
);

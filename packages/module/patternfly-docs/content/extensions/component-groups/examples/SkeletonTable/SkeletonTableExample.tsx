import React from 'react';
import SkeletonTable from "@patternfly/react-component-groups/dist/dynamic/SkeletonTable";

export const SkeletonTableExample: React.FC = () => <SkeletonTable rowsCount={10} columns={[ 'First', 'Second' ]} />

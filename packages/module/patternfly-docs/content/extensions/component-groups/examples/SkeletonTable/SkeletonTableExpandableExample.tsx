import React from 'react';
import SkeletonTable from "@patternfly/react-component-groups/dist/dynamic/SkeletonTable";

export const SkeletonTableExample: React.FC = () => <SkeletonTable rows={10} columns={[ 'first', 'second' ]} isExpandable />;

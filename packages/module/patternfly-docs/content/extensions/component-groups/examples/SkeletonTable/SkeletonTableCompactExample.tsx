import React from 'react';
import SkeletonTable from "@patternfly/react-component-groups/dist/dynamic/SkeletonTable";
import { TableVariant } from '@patternfly/react-table';

export const SkeletonTableExample: React.FC = () => <SkeletonTable rows={10} columns={[ 'first', 'second' ]} variant={TableVariant.compact} borders={false} />;

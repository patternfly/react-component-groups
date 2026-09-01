import { FC } from 'react';
import SkeletonTable from '@patternfly/react-component-groups/dist/dynamic/SkeletonTable';

export const SkeletonTableNoHeaderExample: FC = () => <SkeletonTable columnsCount={3} rowsCount={5} hasHeader={false} />;

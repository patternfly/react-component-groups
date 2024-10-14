import React from 'react';
import Severity from '@patternfly/react-component-groups/dist/dynamic/Severity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BasicExample: React.FunctionComponent = () => <Severity label="Undefined" severity={'an unknown value' as any} />

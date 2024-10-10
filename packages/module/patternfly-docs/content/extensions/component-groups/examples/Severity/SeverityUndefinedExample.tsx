import React from 'react';
import Severity from '@patternfly/react-component-groups/dist/dynamic/Severity';

export const BasicExample: React.FunctionComponent = () => <Severity label="Undefined" severity={'an unknown value' as any} />

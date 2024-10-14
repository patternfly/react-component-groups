import React from 'react';
import Severity, { SeverityType } from '@patternfly/react-component-groups/dist/dynamic/Severity';

export const BasicExample: React.FunctionComponent = () => (

  <Severity severity={SeverityType.critical} label="Critical" />

);

import React from 'react';
import Battery, { BatterySeverity } from '@patternfly/react-component-groups/dist/dynamic/Battery';

export const BasicExample: React.FunctionComponent = () => (

  <Battery severity={BatterySeverity.critical} label="Critical severity" />

);

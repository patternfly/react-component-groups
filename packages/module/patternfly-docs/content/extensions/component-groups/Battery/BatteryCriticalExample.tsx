import React from 'react';
import { Battery } from '@patternfly/react-component-groups';

const BatteryCriticalExample: React.FunctionComponent = () => (
  <>
    <Battery label="With prop: 4" severity={4} />
    <Battery className="pf-u-ml-md" label="With prop: critical" severity="critical" />
  </>
);

export default BatteryCriticalExample;


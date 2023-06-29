import React from 'react';
import { Battery } from '@patternfly/react-component-groups';

const BatteryHighExample: React.FunctionComponent = () => (
  <>
    <Battery label="With prop: 3" severity={3} />
    <Battery className="pf-u-ml-md" label="With prop: high" severity="high" />
    <Battery className="pf-u-ml-md" label="With prop: error" severity="error" />
  </>
);

export default BatteryHighExample;
import React from 'react';
import Battery from '@patternfly/react-component-groups/dist/dynamic/Battery';

const BatteryLowExample: React.FunctionComponent = () => (
  <>
    <Battery label="With prop: 1" severity={1} />
    <Battery className="pf-u-ml-md" label="With prop: low" severity="low" />
    <Battery className="pf-u-ml-md" label="With prop: info" severity="info" />
  </>
);

export default BatteryLowExample;
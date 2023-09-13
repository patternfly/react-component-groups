import React from 'react';
import Battery from '@patternfly/react-component-groups/dist/dynamic/Battery';

const BatteryMediumExample: React.FunctionComponent = () => (
  <>
    <Battery label="With prop: 2" severity={2} />
    <Battery className="pf-u-ml-md" label="With prop: medium" severity="medium" />
    <Battery className="pf-u-ml-md" label="With prop: warn" severity="warn" />
  </>
);

export default BatteryMediumExample;

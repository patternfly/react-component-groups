import React from 'react';
import Battery from '@patternfly/react-component-groups/dist/dynamic/Battery';

export const BasicExample: React.FunctionComponent = () => (
  <>
    <Battery label="With prop: 2" severity={2} />
    <Battery className="pf-v5-u-ml-md" label="With prop: medium" severity="medium" />
    <Battery className="pf-v5-u-ml-md" label="With prop: warn" severity="warn" />
  </>
);

import React from 'react';
import Battery from '@patternfly/react-component-groups/dist/dynamic/Battery';

export const BasicExample: React.FunctionComponent = () => (
  <>
    <Battery label="With prop: 3" severity={3} />
    <Battery className="pf-v5-u-ml-md" label="With prop: high" severity="high" />
    <Battery className="pf-v5-u-ml-md" label="With prop: error" severity="error" />
  </>
);

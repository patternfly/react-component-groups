import React from 'react';
import Battery from '@patternfly/react-component-groups/dist/dynamic/Battery';

export const BasicExample: React.FunctionComponent = () => (
  <>
    <Battery label="With prop: 4" severity={4} />
    <Battery className="pf-v5-u-ml-md" label="With prop: critical" severity="critical" />
  </>
);

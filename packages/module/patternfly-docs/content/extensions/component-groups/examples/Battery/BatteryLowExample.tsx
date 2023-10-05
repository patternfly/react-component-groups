import React from 'react';
import Battery from '@patternfly/react-component-groups/dist/dynamic/Battery';

export const BasicExample: React.FunctionComponent = () => (
  <>
    <Battery label="With prop: 1" severity={1} />
    <Battery className="pf-v5-u-ml-md" label="With prop: low" severity="low" />
    <Battery className="pf-v5-u-ml-md" label="With prop: info" severity="info" />
  </>
);

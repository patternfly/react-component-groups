import React from 'react';
import { ActionButtons } from '@patternfly/react-component-groups';

export const BasicExample: React.FunctionComponent = () => (
  <ActionButtons
    actionButtons={[
      {
        children: 'Primary action',
        // eslint-disable-next-line no-console
        onClick: () => {console.log('Primary action clicked')},
        tooltip: 'Click me!',
      },
      {
        children: 'Secondary action',
        // eslint-disable-next-line no-console
        onClick:  () => {console.log('Secondary action clicked')},
        variant: 'secondary',
      },
    ]}
  />
);

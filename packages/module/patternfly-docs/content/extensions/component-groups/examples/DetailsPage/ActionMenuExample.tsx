/* eslint-disable no-console */
import React from 'react';
import { ActionMenu } from '@patternfly/react-component-groups';

export const BasicExample: React.FunctionComponent = () => (
  <ActionMenu
    actions={[
      {
        children: 'Edit resource',
        itemId: 'action-menu-example-1',
        onClick: () => console.log('Edit resource clicked'),
      },
      {
        children: 'Delete resource',
        itemId: 'action-menu-example-2',
        onClick: () => console.log('Delete resource clicked'),
        isDisabled: true,
      },
    ]}
    id='action-menu-example'
  />
);

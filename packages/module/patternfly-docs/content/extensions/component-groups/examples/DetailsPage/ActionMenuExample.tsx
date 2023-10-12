import React from 'react';
import { ActionMenu } from '@patternfly/react-component-groups';

export const BasicExample: React.FC = () => (
  <ActionMenu
    actions={[
      {
        children: 'Edit resource',
        itemID: 'action-menu-example-1',
        action: {
          // eslint-disable-next-line no-console
          callback: () => console.log('Edit resource clicked'),
        },
      },
      {
        children: 'Delete resource',
        itemID: 'action-menu-example-2',
        action: {
          // eslint-disable-next-line no-console
          callback: () => console.log('Delete resource clicked'),
        },
        isDisabled: true,
      },
    ]}
    id='action-menu-example'
  />
);

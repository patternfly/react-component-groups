/* eslint-disable no-console */
import React from 'react';
import { ActionMenu } from '@patternfly/react-component-groups';

export const BasicExample: React.FunctionComponent = () => (
  <ActionMenu
    groupedActions={[
      {
        groupId: 'group1',
        actions: [
          {
            children: 'Edit resource',
            itemId: 'action-menu-grouped-group-1-example-1',
            onClick: () => console.log('Edit resource clicked')
          },
          {
            children: 'Delete resource',
            itemId: 'action-menu-grouped-group-1-example-2',
            onClick: () => console.log('Delete resource clicked'),
            isDisabled: true,
          },
        ],
      },
      {
        groupId: 'group2',
        label: 'Links',
        actions: [
          {
            children: 'GitHub',
            itemId: 'action-menu-grouped-group-2-example-1',
            onClick: () => console.log('GitHub clicked'),
          },
          {
            children: 'Link',
            itemId: 'action-menu-grouped-group-2-example-2',
            onClick: () => console.log('Link clicked'),
            description: 'Description of link',
          },
        ],
      },
    ]}
    id='action-menu-grouped-example'
  />
);

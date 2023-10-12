import React from 'react';
import { ActionMenu } from '@patternfly/react-component-groups';

export const BasicExample: React.FunctionComponent = () => (
  <ActionMenu
    groupedActions={[
      {
        groupId: 'group1',
        groupActions: [
          {
            children: 'Edit resource',
            itemID: 'action-menu-grouped-group-1-example-1',
            action: {
              // eslint-disable-next-line no-console
              callback: () => console.log('Edit resource clicked'),
            },
          },
          {
            children: 'Delete resource',
            itemID: 'action-menu-grouped-group-1-example-2',
            action: {
              // eslint-disable-next-line no-console
              callback: () => console.log('Delete resource clicked'),
            },
            isDisabled: true,
          },
        ],
      },
      {
        groupId: 'group2',
        label: 'Links',
        groupActions: [
          {
            children: 'GitHub',
            itemID: 'action-menu-grouped-group-2-example-1',
            action: {
              href: 'https://github.com/',
              external: true,
            },
          },
          {
            children: 'Link',
            itemID: 'action-menu-grouped-group-2-example-2',
            action: {
              href: '/#',
            },
            description: 'Description of link',
          },
        ],
      },
    ]}
    displayLabelBeforeIcon
    id='action-menu-grouped-example'
  />
);
